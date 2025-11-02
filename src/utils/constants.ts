import type { GameInfo } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { GAMES } from '@/utils/db.tsx'

export const ENV_IS_DEV = import.meta.env.DEV
export const ENV_IS_PROD = import.meta.env.PROD

export const DELAY = 1000 // 1 second

export const RETRY_ATTEMPTS = 5

export const API_IMPLEMENTATIONS = {
    TRANSFRMARKET: 'transfermarkt',
    FBREF: 'fbref',
    MOCK: 'mock',
}

export const API_IMPLEMENTATION = import.meta.env.VITE_API_IMPLEMENTATION || API_IMPLEMENTATIONS.MOCK

export const API_IMPLEMENTATIONS_SHORTEST_PATH = {
    VERCEL: 'vercel',
    MOCK: 'mock',
}

export const API_IMPLEMENTATION_SHORTEST_PATH =
    import.meta.env.VITE_API_SHORTEST_PATH_IMPLEMENTATION || API_IMPLEMENTATIONS_SHORTEST_PATH.MOCK

export const DEFAULT_GAME_DATE = '2025-10-16'

export const DEFAULT_GAME: GameInfo = {
    date: DEFAULT_GAME_DATE,
    startPlayer: Player.instance(GAMES[DEFAULT_GAME_DATE].start_player_id)
        .setName(GAMES[DEFAULT_GAME_DATE].start_player_name)
        .setImageUrl('/ball.svg'),
    endPlayer: Player.instance(GAMES[DEFAULT_GAME_DATE].end_player_id)
        .setName(GAMES[DEFAULT_GAME_DATE].end_player_name)
        .setImageUrl('/ball.svg'),
    contributor: GAMES[DEFAULT_GAME_DATE].contributor,
}
