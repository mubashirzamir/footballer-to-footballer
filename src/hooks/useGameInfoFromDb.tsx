import { games } from '@/utils/db.tsx'
import type { GameDriver, GameInfo } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { Logger } from '@/utils'
import useGame from '@/hooks/useGame.tsx'

export const useGameInfoFromDb = (): GameDriver => {
    return useGame(getGameInfo())
}

const getGameInfo = (): GameInfo => {
    const date = new Date().toISOString().split('T')[0]
    let info = {
        startPlayer: Player.instance('unknown').setName('Unknown').setImageUrl('/ball.svg'),
        endPlayer: Player.instance('unknown').setName('Unknown').setImageUrl('/ball.svg'),
    }

    try {
        info = {
            startPlayer: Player.instance(games[date].start_player_id)
                .setName(games[date].start_player_name)
                .setImageUrl('/ball.svg'),
            endPlayer: Player.instance(games[date].end_player_id)
                .setName(games[date].end_player_name)
                .setImageUrl('/ball.svg'),
        }
    } catch (e: unknown) {
        Logger.log(e)
    }

    return info
}

export default useGameInfoFromDb
