import type { GameInfo } from '@/hooks/useGameInfo.tsx'
import { useLocation, useParams } from 'react-router'

const useGameInfoFromLocation = (): GameInfo => {
    const { start_player_id: startPlayerId, end_player_id: endPlayerId } = useParams()
    const location = useLocation()

    // TODO: add optional logic to ensure that start_player_id and end_player_id match the daily challenge on the home page

    if (!location.pathname.startsWith('/play/')) {
        throw new Error('No game info in non-play route')
    }

    if (!startPlayerId || !endPlayerId) {
        throw new Error('Missing player IDs in URL parameters')
    }

    return {
        startPlayer: {
            id: startPlayerId,
            name: '',
            imageUrl: '/ball.svg',
        },
        endPlayer: {
            id: endPlayerId,
            name: '',
            imageUrl: '/ball.svg',
        },
    }
}

export default useGameInfoFromLocation
