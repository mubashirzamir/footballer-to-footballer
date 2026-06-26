#!/usr/bin/env node
/**
 * generate-games.mjs
 *
 * Generates 10 new daily "football connections" game entries and appends
 * them to src/data/games.ts (adjust GAMES_FILE_PATH below to match your repo).
 *
 * Pipeline (per game):
 *   1. Ask an LLM to propose a start/end player NAME pair (not IDs — IDs are
 *      never trusted from model memory, regardless of provider).
 *   2. Resolve each name to a real Transfermarkt player_id by querying a
 *      transfermarkt-api instance (https://github.com/felipeall/transfermarkt-api).
 *   3. Take the top Transfermarkt result for each name (no LLM disambiguation).
 *   4. Avoid any player_id used in the last RECENT_WINDOW games.
 *   5. Append validated entries as new dates, oldest-first continuing from
 *      the most recent existing date.
 *
 * Provider-agnostic: uses LLMGateway as a unified gateway, allowing Bring Your Own Keys (BYOK).
 * Every prompt and all orchestration logic is shared — swap models by changing LLM_MODEL to
 * any LLMGateway-supported model slug (e.g. openai/gpt-4o, anthropic/claude-sonnet-4, google-ai-studio/gemini-2.5-flash).
 *
 * This script does NOT auto-merge anything. It only writes to a local file;
 * the calling GitHub Action handles branch/commit/PR creation.
 */

import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const GAMES_FILE_PATH = path.resolve(
  process.cwd(),
  process.env.GAMES_FILE_PATH || "src/data/games.ts",
);

const TRANSFERMARKT_API_BASE =
  process.env.VITE_API_BASE_URL || "http://localhost:8000";

const GAMES_TO_GENERATE = Number(process.env.GAMES_TO_GENERATE || 10);
const RECENT_WINDOW = Number(process.env.RECENT_WINDOW || 60); // games to avoid repeating players from
const CONTRIBUTOR = process.env.CONTRIBUTOR || "ai-agent";

// --- LLM (via LLMGateway) ---
// Uses a single LLMGateway API key for all model access, with BYOK support for providers like Anthropic.
// Set LLMGATEWAY_API_KEY and optionally LLM_MODEL (any LLMGateway-supported model slug).
// Configure your provider API keys (e.g., ANTHROPIC_API_KEY) in the LLMGateway dashboard.
const LLMGATEWAY_API_KEY = process.env.LLMGATEWAY_API_KEY;
if (!LLMGATEWAY_API_KEY) {
  console.error("Missing LLMGATEWAY_API_KEY");
  process.exit(1);
}

const LLM_MODEL = process.env.LLM_MODEL || "google-ai-studio/gemini-2.5-flash-lite"; // Default to a common model if not specified

console.log(`Using LLM model: ${LLM_MODEL}`);

function ts() {
  return new Date().toISOString().slice(11, 19);
}

// ---------------------------------------------------------------------------
// Step 0: Read + parse the existing games.ts file
// ---------------------------------------------------------------------------

function readExistingGames() {
  const src = fs.readFileSync(GAMES_FILE_PATH, "utf8");

  // Pull out the date keys + start/end player ids/names already present,
  // without a full TS parse (keeps this dependency-free). The file is a
  // predictable object literal, so a regex-per-entry pass is reliable enough.
  const entryRegex =
    /'(\d{4}-\d{2}-\d{2})':\s*\{\s*start_player_id:\s*'(\d+)',\s*start_player_name:\s*'([^']+)',\s*end_player_id:\s*'(\d+)',\s*end_player_name:\s*'([^']+)',\s*contributor:\s*'([^']*)',?\s*\}/g;

  const entries = [];
  let match;
  while ((match = entryRegex.exec(src)) !== null) {
    const [, date, startId, startName, endId, endName, contributor] = match;
    entries.push({ date, startId, startName, endId, endName, contributor });
  }

  if (entries.length === 0) {
    throw new Error(
      "Could not parse any existing entries from games.ts — check GAMES_FILE_PATH / regex against current file format.",
    );
  }

  // Sort descending by date (file appears to already be newest-first, but don't assume)
  entries.sort((a, b) => (a.date < b.date ? 1 : -1));

  return { src, entries };
}

function nextDates(mostRecentDateStr, count) {
  const dates = [];
  const d = new Date(mostRecentDateStr + "T00:00:00Z");
  for (let i = 1; i <= count; i++) {
    const next = new Date(d);
    next.setUTCDate(d.getUTCDate() + i);
    dates.push(next.toISOString().slice(0, 10));
  }
  return dates;
}

// ---------------------------------------------------------------------------
// Step 1: Transfermarkt lookups (the source of truth for IDs — provider-independent)
// ---------------------------------------------------------------------------

async function searchPlayer(name) {
  const url = `${TRANSFERMARKT_API_BASE}/players/search/${encodeURIComponent(name)}`;
  console.log(`[${ts()}] [API] GET ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Transfermarkt search failed for "${name}": ${res.status}`);
  }
  const data = await res.json();
  const results = (data.results || []).map((r) => ({
    id: String(r.id),
    name: r.name,
    club: r.club?.name,
    position: r.position,
    nationalities: r.nationalities,
    dateOfBirth: r.dateOfBirth,
  }));
  console.log(`[${ts()}] [API] "${name}" → ${results.length} candidate(s)`);
  for (const r of results.slice(0, 3)) {
    console.log(`[${ts()}] [API]   - id: ${r.id}, name: ${r.name}, club: ${r.club || "-"}, position: ${r.position || "-"}`);
  }
  if (results.length > 3) {
    console.log(`[${ts()}] [API]   ... and ${results.length - 3} more`);
  }
  return results;
}

// ---------------------------------------------------------------------------
// Step 2: LLM adapter — single OpenRouter endpoint, OpenAI-compatible format.
// Every call site below just calls callLLM({ system, user }) and gets back
// a plain string of model output, regardless of which model is used.
// ---------------------------------------------------------------------------

async function callLLM({ system, user }) {
  const maxRetries = 3;
  for (let i = 0; i < maxRetries; i++) {
    const t0 = Date.now();
    const res = await fetch("https://api.llmgateway.io/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LLMGATEWAY_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        max_tokens: 4000,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    const raw = await res.text();
    console.log(raw);
    const data = JSON.parse(raw);
    // const data = await res.json();
    if (!res.ok || data.error) {
      const msg = data.error?.message || `${res.status}`;
      const body = JSON.stringify(data).slice(0, 500);
      console.log(`[${ts()}] [LLM] API error after ${elapsed}s: ${msg} — ${body}`);
      if (i < maxRetries - 1) {
        console.log(`[${ts()}] [LLM] Retry ${i + 1}/${maxRetries}...`);
        continue;
      }
      throw new Error(`LLMGateway API error after ${elapsed}s: ${msg}`);
    }
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.log(`[${ts()}] [LLM] Empty content after ${elapsed}s, retrying...`);
      if (i < maxRetries - 1) continue;
      throw new Error(
        `LLMGateway returned no choices after ${elapsed}s. Response: ${JSON.stringify(data).slice(0, 1000)}`,
      );
    }
    console.log(`[${ts()}] [LLM] ← received response (${elapsed}s, ${content.length} chars)`);
    return content;
  }
}

function extractJson(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      `Failed to parse LLM response as JSON:\n${cleaned.slice(0, 2000)}\n\nParse error: ${err.message}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Step 3: Prompts — identical regardless of provider
// ---------------------------------------------------------------------------

/**
 * Ask the LLM for `count` candidate pairs of well-known footballer NAMES
 * (never IDs), avoiding a given exclusion list.
 * This is intentionally a name-only
 * step — IDs are resolved afterward against Transfermarkt directly.
 */
async function proposeCandidatePairs(count, excludeNames) {
  const system = `You generate puzzle pairs for a football "connections" game, similar in spirit \
to a footballing six-degrees game. Each puzzle gives a player NAME pair (start, end) that a \
knowledgeable football fan could connect through a chain of shared clubs or transfers. \
Puzzles should require at least 2 intermediate steps — do NOT pick pairs who were direct club \
teammates (e.g. Rooney & Ronaldo, Messi & Xavi). Pairs should be interesting, well-known \
footballers from different clubs or eras. Avoid obscure players. Respond ONLY with a JSON \
object, no preamble, no markdown fences.`;

  const user = `Propose ${count} start/end player name pairs as a JSON object like:
{"pairs": [{"start_player_name": "...", "end_player_name": "..."}]}

Rules:
- Use full, correctly-spelled real player names as they'd appear on Transfermarkt.
- Do NOT reuse any of these names (already used recently): ${JSON.stringify(excludeNames)}
- The two players MUST NOT have been direct club teammates — the path between them should require intermediate connections.
- Vary eras/leagues across the ${count} pairs — don't repeat the same two clubs every time.
- Each pair should have a findable connection path through shared clubs or transfers, but do not list the full path.`;

  const maxRetries = 3;
  for (let i = 0; i < maxRetries; i++) {
    console.log(`[${ts()}] [LLM] Requesting ${count} candidate pairs...`);
    const text = await callLLM({ system, user });
    try {
      const parsed = extractJson(text);
      const pairs = parsed.pairs || [];
      if (pairs.length > 0) {
        console.log(`[${ts()}] [LLM] Parsed ${pairs.length} candidate pairs from response`);
        return pairs;
      }
      console.log(`[${ts()}] [LLM] Response had 0 pairs, retrying...`);
    } catch (err) {
      console.log(`[${ts()}] [LLM] Parse failed: ${err.message.slice(0, 200)}`);
      if (i < maxRetries - 1) {
        console.log(`[${ts()}] [LLM] Retry ${i + 1}/${maxRetries}...`);
      } else {
        throw err;
      }
    }
  }
}

async function resolvePlayer(name) {
  const candidates = await searchPlayer(name);
  if (candidates.length === 0) {
    console.log(`[${ts()}] [RES] "${name}" → no candidates found`);
    return null;
  }
  const pick = candidates[0];
  console.log(`[${ts()}] [RES] "${name}" → id: ${pick.id} (${pick.name}) [top of ${candidates.length}]`);
  return pick;
}

async function buildValidatedGames({ count, excludeIds, excludeNames }) {
  const results = [];
  const usedIds = new Set(excludeIds);
  const usedNamesThisRun = new Set(excludeNames);

  let attempts = 0;
  const maxAttempts = 4;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    const need = count - results.length;
    console.log(`[${ts()}] === Attempt ${attempts}/${maxAttempts} — need ${need} more game(s) ===`);
    const candidatePairs = await proposeCandidatePairs(
      need + 3,
      Array.from(usedNamesThisRun),
    );

    let processed = 0;
    for (const pair of candidatePairs) {
      if (results.length >= count) break;
      processed++;

      const { start_player_name, end_player_name } = pair;
      console.log(`[${ts()}] --- Pair ${processed}/${candidatePairs.length}: "${start_player_name}" ↔ "${end_player_name}" ---`);

      if (
        usedNamesThisRun.has(start_player_name) ||
        usedNamesThisRun.has(end_player_name)
      ) {
        console.log(`[${ts()}]   ✗ Skipped — name used in this run or recent window`);
        continue;
      }

      let startPlayer, endPlayer;
      try {
        [startPlayer, endPlayer] = await Promise.all([
          resolvePlayer(start_player_name),
          resolvePlayer(end_player_name),
        ]);
      } catch (err) {
        console.log(`[${ts()}]   ✗ Skipped — resolution error: ${err.message}`);
        continue;
      }

      if (!startPlayer || !endPlayer) {
        console.log(`[${ts()}]   ✗ Skipped — could not confidently resolve one or both players`);
        continue;
      }

      if (usedIds.has(startPlayer.id) || usedIds.has(endPlayer.id)) {
        console.log(`[${ts()}]   ✗ Skipped — player ID used recently: ${startPlayer.id} / ${endPlayer.id}`);
        continue;
      }

      if (startPlayer.id === endPlayer.id) {
        console.log(`[${ts()}]   ✗ Skipped — both names resolved to same ID (${startPlayer.id})`);
        continue;
      }

      results.push({
        start_player_id: startPlayer.id,
        start_player_name: startPlayer.name,
        end_player_id: endPlayer.id,
        end_player_name: endPlayer.name,
      });

      console.log(`[${ts()}]   ✓ Accepted (${results.length}/${count}) — ${startPlayer.name} → ${endPlayer.name}`);

      usedIds.add(startPlayer.id);
      usedIds.add(endPlayer.id);
      usedNamesThisRun.add(start_player_name);
      usedNamesThisRun.add(end_player_name);
    }

    console.log(`[${ts()}] Attempt ${attempts} done: ${results.length}/${count} validated so far`);
  }

  if (results.length < count) {
    throw new Error(
      `Only generated ${results.length}/${count} valid games after ${attempts} attempts. Aborting rather than writing a partial/low-quality batch.`,
    );
  }

  return results;
}

// ---------------------------------------------------------------------------
// Step 5: Write back to games.ts
// ---------------------------------------------------------------------------

function formatEntry(date, game) {
  return `    '${date}': {
        start_player_id: '${game.start_player_id}',
        start_player_name: '${game.start_player_name.replace(/'/g, "\\'")}',
        end_player_id: '${game.end_player_id}',
        end_player_name: '${game.end_player_name.replace(/'/g, "\\'")}',
        contributor: '${CONTRIBUTOR}',
    },`;
}

function insertEntries(src, datedGames) {
  // Existing file has newest entries first, directly after the opening
  // `Record<string, Game> = {` line. New (newer) dates get inserted right
  // after that line, in date-descending order, preserving the file's
  // existing convention.
  const openMarker = /Record<string, Game> = \{\s*\n/;
  const match = src.match(openMarker);
  if (!match) {
    throw new Error("Could not find `Record<string, Game> = {` marker in games.ts");
  }

  const insertionPoint = match.index + match[0].length;
  const block =
    datedGames
      .slice()
      .reverse() // newest of the new batch first
      .map(([date, game]) => formatEntry(date, game))
      .join("\n") + "\n";

  return src.slice(0, insertionPoint) + block + src.slice(insertionPoint);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { src, entries } = readExistingGames();

  const mostRecentDate = entries[0].date;
  const recentEntries = entries.slice(0, RECENT_WINDOW);
  const excludeIds = recentEntries.flatMap((e) => [e.startId, e.endId]);
  const excludeNames = recentEntries.flatMap((e) => [e.startName, e.endName]);

  console.log(`Most recent existing date: ${mostRecentDate}`);
  console.log(`Excluding ${excludeIds.length} recently-used player IDs (last ${recentEntries.length} games)`);

  const games = await buildValidatedGames({
    count: GAMES_TO_GENERATE,
    excludeIds,
    excludeNames,
  });

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const dates = nextDates(yesterday, GAMES_TO_GENERATE);
  const datedGames = dates.map((date, i) => [date, games[i]]);

  const updatedSrc = insertEntries(src, datedGames);
  fs.writeFileSync(GAMES_FILE_PATH, updatedSrc, "utf8");

  console.log(`\nAppended ${datedGames.length} new games to ${GAMES_FILE_PATH}:\n`);
  for (const [date, game] of datedGames) {
    console.log(
      `  ${date}: ${game.start_player_name} (${game.start_player_id}) -> ${game.end_player_name} (${game.end_player_id})`,
    );

  }

  // Write a summary file the GitHub Action can drop straight into the PR body.
  const summaryLines = [
    `Adds ${datedGames.length} new daily games (${dates[0]} → ${dates[dates.length - 1]}).`,
    "",
    `Generated using **${LLM_MODEL}** via LLMGateway (BYOK).`,
    "",
    "| Date | Start | End |",
    "|---|---|---|",
    ...datedGames.map(
      ([date, g]) =>
        `| ${date} | ${g.start_player_name} (${g.start_player_id}) | ${g.end_player_name} (${g.end_player_id}) |`,
    ),
    "",
    "⚠️ Auto-generated. Player IDs were resolved against Transfermarkt search results — please double check before merging.",
  ];
  fs.writeFileSync(
    path.resolve(process.cwd(), "pr-summary.md"),
    summaryLines.join("\n"),
    "utf8",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
