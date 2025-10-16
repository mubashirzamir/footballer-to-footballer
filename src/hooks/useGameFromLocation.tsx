import { useLocation, useParams } from 'react-router'
import { Player } from '@/structures/Player.ts'
import useGame from '@/hooks/useGame.tsx'
import type { GameDriver } from '@/structures'

const useGameInfoFromLocation = (): GameDriver => {
    const { start_player_id: startPlayerId, end_player_id: endPlayerId } = useParams()
    const location = useLocation()

    if (!location.pathname.startsWith('/play/')) {
        throw new Error('No game info in non-play route')
    }

    if (!startPlayerId || !endPlayerId) {
        throw new Error('Missing player IDs in URL parameters')
    }

    return useGame({
        startPlayer: Player.instance(startPlayerId).setName('').setImageUrl('/ball.svg'),
        endPlayer: Player.instance(endPlayerId).setName('').setImageUrl('/ball.svg'),
    })
}

export default useGameInfoFromLocation
