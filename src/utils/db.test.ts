import { describe, it, expect } from 'vitest'
import { GAMES } from './db.tsx'

describe('GAMES database', () => {
    it('should have no duplicate (start_player_id, end_player_id) pairs', () => {
        const pairs = Object.values(GAMES).map(
            (game) => `${game.start_player_id}-${game.end_player_id}`,
        )
        const uniquePairs = new Set(pairs)
        expect(uniquePairs.size).toBe(pairs.length)
    })

    it('should have no reverse duplicates (A→B and B→A)', () => {
        const forwardSet = new Set<string>()
        for (const game of Object.values(GAMES)) {
            const reverse = `${game.end_player_id}-${game.start_player_id}`
            expect(forwardSet.has(reverse)).toBe(false)
            forwardSet.add(`${game.start_player_id}-${game.end_player_id}`)
        }
    })

    it('should have no self-games (start_player_id === end_player_id)', () => {
        for (const game of Object.values(GAMES)) {
            expect(game.start_player_id).not.toBe(game.end_player_id)
        }
    })

    it('should have all required fields for every entry', () => {
        for (const game of Object.values(GAMES)) {
            expect(game.start_player_id).toBeTruthy()
            expect(game.start_player_name).toBeTruthy()
            expect(game.end_player_id).toBeTruthy()
            expect(game.end_player_name).toBeTruthy()
            expect(game.contributor).toBeTruthy()
        }
    })
})
