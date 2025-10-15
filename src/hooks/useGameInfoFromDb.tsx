import { games } from '@/utils/db.tsx'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import type { GameDriver, GameInfo } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { playerList } from '@/utils/mock.ts'
import { Logger } from '@/utils'

const useGameInfoFromDb = (): GameDriver => {
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState<GameInfo>(getGameInfo())

    // TODO: Awfully similar to useGameInfoFromLocation, refactor to remove duplication
    useEffect(() => {
        // Placeholder for API call to fetch player info
        setLoading(true)
        setTimeout(() => {
            setInfo((info) => ({
                startPlayer: Player.instance(info.startPlayer.id)
                    .setName(playerList.find((p) => p.id === info.startPlayer.id)?.name ?? '')
                    .setImageUrl('https://github.com/shadcn.png'),
                endPlayer: Player.instance(info.endPlayer.id)
                    .setName(playerList.find((p) => p.id === info.endPlayer.id)?.name ?? '')
                    .setImageUrl('https://github.com/shadcn.png'),
            }))

            setLoading(false)
        }, DELAY)
    }, [])

    return { gameInfo: info, loading }
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
