import { useLocation, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import { Player } from '@/structures/Player.ts'
import type { GameInfo } from '@/structures'
import { playerList } from '@/utils/mock.ts'

type GameDriver = {
    gameInfo: GameInfo
    loading: boolean
}

const useGameInfoFromLocation = (): GameDriver => {
    const { start_player_id: startPlayerId, end_player_id: endPlayerId } = useParams()
    const location = useLocation()

    // TODO: add optional logic to ensure that start_player_id and end_player_id match the daily challenge on the home page

    if (!location.pathname.startsWith('/play/')) {
        throw new Error('No game info in non-play route')
    }

    if (!startPlayerId || !endPlayerId) {
        throw new Error('Missing player IDs in URL parameters')
    }

    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState<GameInfo>({
        startPlayer: Player.instance(startPlayerId).setName('').setImageUrl('./ball.svg'),
        endPlayer: Player.instance(endPlayerId).setName('').setImageUrl('./ball.svg'),
    })

    useEffect(() => {
        // Placeholder for API call to fetch player info
        setLoading(true)
        setTimeout(() => {
            setInfo(() => ({
                startPlayer: Player.instance(startPlayerId)
                    .setName(playerList.find((p) => p.id === startPlayerId)?.name ?? '')
                    .setImageUrl('https://github.com/shadcn.png'),
                endPlayer: Player.instance(endPlayerId)
                    .setName(playerList.find((p) => p.id === endPlayerId)?.name ?? '')
                    .setImageUrl('https://github.com/shadcn.png'),
            }))

            setLoading(false)
        }, DELAY)
    }, [startPlayerId, endPlayerId])

    return { gameInfo: info, loading }
}

export default useGameInfoFromLocation
