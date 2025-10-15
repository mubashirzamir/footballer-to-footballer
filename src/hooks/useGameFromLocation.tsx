import { useLocation, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import { Player } from '@/structures/Player.ts'
import type { GameInfo } from '@/structures'

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

    if (startPlayerId === endPlayerId) {
        throw new Error('Start and end player IDs cannot be the same')
    }

    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState<GameInfo>({
        startPlayer: Player.instance(startPlayerId).setName('').setImageUrl('/ball.svg'),
        endPlayer: Player.instance(endPlayerId).setName('').setImageUrl('/ball.svg'),
    })

    useEffect(() => {
        // Placeholder for API call to fetch player info
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, DELAY)
    }, [startPlayerId, endPlayerId])

    return { gameInfo: info, loading }
}

export default useGameInfoFromLocation
