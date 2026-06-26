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
 *   3. If a name is ambiguous (multiple plausible matches), ask the LLM to
 *      disambiguate using returned metadata (club, position, nationality, age).
 *   4. Avoid any player_id used in the last RECENT_WINDOW games.
 *   5. Append validated entries as new dates, oldest-first continuing from
 *      the most recent existing date.
 *
 * Provider-agnostic: uses OpenRouter as a unified gateway. Every prompt and
 * all orchestration logic is shared — swap models by changing LLM_MODEL to
 * any OpenRouter model slug (e.g. openai/gpt-4o, anthropic/claude-sonnet-4).
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

// --- LLM (via OpenRouter) ---
// Uses a single OpenRouter API key for all model access.
// Set OPENROUTER_API_KEY and optionally LLM_MODEL (any OpenRouter model slug).
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error("Missing OPENROUTER_API_KEY");
  process.exit(1);
}

const LLM_MODEL = process.env.LLM_MODEL || "openai/gpt-4o-2024-11-20";

console.log(`Using LLM model: ${LLM_MODEL}`);

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
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Transfermarkt search failed for "${name}": ${res.status}`);
  }
  const data = await res.json();
  // felipeall/transfermarkt-api returns { results: [...] }
  return (data.results || []).map((r) => ({
    id: String(r.id),
    name: r.name,
    club: r.club?.name,
    position: r.position,
    nationalities: r.nationalities,
    dateOfBirth: r.dateOfBirth,
  }));
}

// ---------------------------------------------------------------------------
// Step 2: LLM adapter — single OpenRouter endpoint, OpenAI-compatible format.
// Every call site below just calls callLLM({ system, user }) and gets back
// a plain string of model output, regardless of which model is used.
// ---------------------------------------------------------------------------

async function callLLM({ system, user }) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      max_tokens: 2000,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenRouter API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

function extractJson(text) {
  // response_format/responseMimeType ask nicely for pure JSON, but not every
  // provider/model combination honors it consistently — strip code fences
  // defensively either way.
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

// ---------------------------------------------------------------------------
// Step 3: Prompts — identical regardless of provider
// ---------------------------------------------------------------------------

/**
 * Ask the LLM for `count` candidate pairs of well-known footballer NAMES
 * (never IDs), avoiding a given exclusion list, with a short rationale
 * for the connection between them. This is intentionally a name-only
 * step — IDs are resolved afterward against Transfermarkt directly.
 */
async function proposeCandidatePairs(count, excludeNames) {
  const system = `You generate puzzle pairs for a football "connections" game, similar in spirit \
to a footballing six-degrees game. Each puzzle gives a player NAME pair (start, end) that a \
knowledgeable football fan could plausibly connect through shared clubs, national teams, \
transfers, or eras. Pairs should be interesting and well-known footballers — avoid obscure \
players. Respond ONLY with a JSON object, no preamble, no markdown fences.`;

  const user = `Propose ${count} start/end player name pairs as a JSON object like:
{"pairs": [{"start_player_name": "...", "end_player_name": "...", "rationale": "short reason a connection exists"}]}

Rules:
- Use full, correctly-spelled real player names as they'd appear on Transfermarkt.
- Do NOT reuse any of these names (already used recently): ${JSON.stringify(excludeNames)}
- Vary eras/leagues/nationalities across the ${count} pairs — don't repeat the same two clubs every time.
- Each pair should have a findable connection (shared club, shared national team, or well-known transfer link), but you do not need to specify the full path — just make sure one plausibly exists.`;

  const text = await callLLM({ system, user });
  const parsed = extractJson(text);
  return parsed.pairs || [];
}

/**
 * Given a player name and several Transfermarkt search candidates, ask
 * the LLM to pick the correct one (handles same-name disambiguation).
 * Returns null if the model isn't confident, so the pair gets discarded
 * rather than guessed.
 */
async function disambiguatePlayer(name, candidates) {
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  const system = `You match a football player name to the correct Transfermarkt search result. \
Respond ONLY with a JSON object: {"chosen_id": "<id>"} or {"chosen_id": null} if you are not \
confident any candidate is the intended well-known player.`;

  const user = `Player intended: "${name}"\n\nCandidates:\n${JSON.stringify(candidates, null, 2)}`;

  const text = await callLLM({ system, user });
  const parsed = extractJson(text);
  if (!parsed.chosen_id) return null;
  return candidates.find((c) => c.id === String(parsed.chosen_id)) || null;
}

/**
 * Lightweight plausibility check for a connection between two resolved
 * players. This is NOT a full graph search (we don't have one) — it's a
 * second LLM pass that must justify the link using verifiable facts
 * (shared club + overlapping years, or shared national team), so an
 * obviously-impossible pair (e.g. eras 50 years apart, no overlap) gets
 * caught before being written to the file.
 */
async function checkConnectionPlausible(startPlayer, endPlayer) {
  const system = `You are validating whether two footballers could plausibly be connected \
through shared clubs, national teams, or direct transfers, for a football trivia game. \
Respond ONLY with a JSON object: {"plausible": true|false, "reason": "short reason"}.`;

  const user = `Player A: ${startPlayer.name} (Transfermarkt ID ${startPlayer.id}, club at time of record: ${startPlayer.club || "unknown"})
Player B: ${endPlayer.name} (Transfermarkt ID ${endPlayer.id}, club at time of record: ${endPlayer.club || "unknown"})

Is there a plausible connection path between these two players (shared club at any point in their careers, shared national team, or a direct transfer/teammate link)? Use your knowledge of football history.`;

  const text = await callLLM({ system, user });
  return extractJson(text);
}

// ---------------------------------------------------------------------------
// Step 4: Orchestration — identical regardless of provider
// ---------------------------------------------------------------------------

async function resolvePlayer(name) {
  const candidates = await searchPlayer(name);
  return disambiguatePlayer(name, candidates);
}

async function buildValidatedGames({ count, excludeIds, excludeNames }) {
  const results = [];
  const usedIds = new Set(excludeIds);
  const usedNamesThisRun = new Set(excludeNames);

  // Over-fetch candidate pairs since some will fail resolution/validation.
  let attempts = 0;
  const maxAttempts = 4;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    const need = count - results.length;
    const candidatePairs = await proposeCandidatePairs(
      need + 3, // pad for expected dropout
      Array.from(usedNamesThisRun),
    );

    for (const pair of candidatePairs) {
      if (results.length >= count) break;

      const { start_player_name, end_player_name, rationale } = pair;
      if (
        usedNamesThisRun.has(start_player_name) ||
        usedNamesThisRun.has(end_player_name)
      ) {
        continue;
      }

      let startPlayer, endPlayer;
      try {
        [startPlayer, endPlayer] = await Promise.all([
          resolvePlayer(start_player_name),
          resolvePlayer(end_player_name),
        ]);
      } catch (err) {
        console.warn(`Skipping pair (${start_player_name} / ${end_player_name}): ${err.message}`);
        continue;
      }

      if (!startPlayer || !endPlayer) {
        console.warn(
          `Skipping pair — could not confidently resolve: "${start_player_name}" / "${end_player_name}"`,
        );
        continue;
      }

      if (usedIds.has(startPlayer.id) || usedIds.has(endPlayer.id)) {
        console.warn(`Skipping pair — player ID used recently: ${startPlayer.id}/${endPlayer.id}`);
        continue;
      }

      if (startPlayer.id === endPlayer.id) continue;

      const check = await checkConnectionPlausible(startPlayer, endPlayer);
      if (!check.plausible) {
        console.warn(
          `Skipping pair — connection not plausible: ${startPlayer.name} / ${endPlayer.name} (${check.reason})`,
        );
        continue;
      }

      results.push({
        start_player_id: startPlayer.id,
        start_player_name: startPlayer.name,
        end_player_id: endPlayer.id,
        end_player_name: endPlayer.name,
        rationale: rationale || check.reason,
      });

      usedIds.add(startPlayer.id);
      usedIds.add(endPlayer.id);
      usedNamesThisRun.add(start_player_name);
      usedNamesThisRun.add(end_player_name);
    }
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
  return `'${date}': {
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
    console.log(`    rationale: ${game.rationale}`);
  }

  // Write a summary file the GitHub Action can drop straight into the PR body.
  const summaryLines = [
    `Adds ${datedGames.length} new daily games (${dates[0]} → ${dates[dates.length - 1]}).`,
    "",
    `Generated using **${LLM_MODEL}** via OpenRouter.`,
    "",
    "| Date | Start | End | Rationale |",
    "|---|---|---|---|",
    ...datedGames.map(
      ([date, g]) =>
        `| ${date} | ${g.start_player_name} (${g.start_player_id}) | ${g.end_player_name} (${g.end_player_id}) | ${g.rationale} |`,
    ),
    "",
    "⚠️ Auto-generated. Player IDs were resolved against Transfermarkt search results, and connections were sanity-checked by an LLM, not a verified graph — please double check before merging.",
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
