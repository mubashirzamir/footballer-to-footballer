import { GAME_INFO as MOCK_GAME_INFO } from '@/services/mock/mock.ts'
import type { GameDriver, GameInfo } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { Logger } from '@/utils'
import useGame from '@/hooks/useGame.tsx'
import { API_IMPLEMENTATION, API_IMPLEMENTATIONS } from '@/utils/constants.ts'
import { GAMES } from '@/utils/db.tsx'

export const useGameInfoFromDb = (): GameDriver => {
    return useGame(getGamesFor(API_IMPLEMENTATION))
}

const getGamesFor = (impl: string) => {
    return GAME_INFO_PROVIDERS[impl]?.() ?? GAME_INFO_PROVIDERS.default()
}

const getGameInfo = (): GameInfo => {
    const date = new Date().toISOString().split('T')[0]
    let info = {
        startPlayer: Player.instance('unknown').setName('Unknown').setImageUrl('/ball.svg'),
        endPlayer: Player.instance('unknown').setName('Unknown').setImageUrl('/ball.svg'),
    }

    try {
        info = {
            startPlayer: Player.instance(GAMES[date].start_player_id)
                .setName(GAMES[date].start_player_name)
                .setImageUrl('/ball.svg'),
            endPlayer: Player.instance(GAMES[date].end_player_id)
                .setName(GAMES[date].end_player_name)
                .setImageUrl('/ball.svg'),
        }
    } catch (e: unknown) {
        Logger.log(e)
    }

    return info
}

const GAME_INFO_PROVIDERS = {
    [API_IMPLEMENTATIONS.TRANSFRMARKET]: getGameInfo,
    default: MOCK_GAME_INFO,
}

export default useGameInfoFromDb
