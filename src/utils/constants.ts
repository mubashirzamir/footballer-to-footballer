import type { GameInfo } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { GAMES } from '@/utils/db.tsx'
import { randomDate } from '@/utils/index.ts'

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

/**
 * Currently db.tsx has games for dates between 2025-10-16 to 2025-11-02
 */
export const DB_DATE_START = '2025-10-16'
export const DB_DATE_END = '2025-11-02'

const RANDOM_GAME_DATE = randomDate(new Date(DB_DATE_START), new Date(DB_DATE_END))
const RANDOM_GAME = GAMES[RANDOM_GAME_DATE] || GAMES[DB_DATE_START]

export const DEFAULT_GAME: GameInfo = {
    date: RANDOM_GAME_DATE,
    startPlayer: Player.instance(RANDOM_GAME.start_player_id).setName(RANDOM_GAME.start_player_name).setImageUrl('/ball.svg'),
    endPlayer: Player.instance(RANDOM_GAME.end_player_id).setName(RANDOM_GAME.end_player_name).setImageUrl('/ball.svg'),
    contributor: RANDOM_GAME.contributor,
}
