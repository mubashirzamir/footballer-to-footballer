import { describe, it, expect } from 'vitest'
import { GAMES } from './db.tsx'

describe('GAMES database', () => {
    it('should have no duplicate (start_player_id, end_player_id) pairs', () => {
        const pairs = Object.entries(GAMES).map(
            ([date, game]) => `${game.start_player_id}-${game.end_player_id}`,
        )
        const uniquePairs = new Set(pairs)
        expect(uniquePairs.size).toBe(pairs.length)
    })

    it('should have no reverse duplicates (A→B and B→A)', () => {
        const pairs = Object.entries(GAMES).map(([date, game]) => ({
            date,
            forward: `${game.start_player_id}-${game.end_player_id}`,
            reverse: `${game.end_player_id}-${game.start_player_id}`,
        }))

        const forwardSet = new Set<string>()
        for (const { date, forward, reverse } of pairs) {
            expect(forwardSet.has(reverse)).toBe(false)
            forwardSet.add(forward)
        }
    })

    it('should have no self-games (start_player_id === end_player_id)', () => {
        for (const [date, game] of Object.entries(GAMES)) {
            expect(game.start_player_id).not.toBe(game.end_player_id)
        }
    })

    it('should have all required fields for every entry', () => {
        for (const [date, game] of Object.entries(GAMES)) {
            expect(game.start_player_id).toBeTruthy()
            expect(game.start_player_name).toBeTruthy()
            expect(game.end_player_id).toBeTruthy()
            expect(game.end_player_name).toBeTruthy()
            expect(game.contributor).toBeTruthy()
        }
    })
})
