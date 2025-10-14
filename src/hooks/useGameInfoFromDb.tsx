import { games } from '@/utils/db.tsx'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import type { GameDriver, GameInfo } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { playerList } from '@/utils/mock.ts'

const useGameInfoFromDb = (): GameDriver => {
    const date = new Date().toISOString().split('T')[0]
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState<GameInfo>({
        startPlayer: Player.instance(games[date].start_player_id)
            .setName(games[date].start_player_name)
            .setImageUrl('/ball.svg'),
        endPlayer: Player.instance(games[date].end_player_id)
            .setName(games[date].end_player_name)
            .setImageUrl('/ball.svg'),
    })

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

export default useGameInfoFromDb
