import { useLocation, useParams } from 'react-router'
import { Player } from '@/structures/Player.ts'
import useGame from '@/hooks/useGame.tsx'
import type { GameDriver, GameInfo } from '@/structures'
import { API_IMPLEMENTATION, API_IMPLEMENTATIONS } from '@/utils/constants.ts'
import { GAME_INFO as MOCK_GAME_INFO } from '@/services/mock/mock.ts'

const useGameInfoFromLocation = (): GameDriver => {
    const { start_player_id: startPlayerId, end_player_id: endPlayerId } = useParams()
    const location = useLocation()

    if (!location.pathname.startsWith('/play/')) {
        throw new Error('No game info in non-play route')
    }

    if (!startPlayerId || !endPlayerId) {
        throw new Error('Missing player IDs in URL parameters')
    }

    if (startPlayerId === endPlayerId) {
        throw new Error('Start and end player IDs cannot be the same')
    }

    return useGame(getGamesFor(startPlayerId, endPlayerId, API_IMPLEMENTATION))
}

const getGamesFor = (startPlayerId: string, endPlayerId: string, impl: string) => {
    return GAME_INFO_PROVIDERS[impl]?.(startPlayerId, endPlayerId) ?? GAME_INFO_PROVIDERS.default()
}

const getGameInfo = (startPlayerId: string, endPlayerId: string): GameInfo => {
    return {
        startPlayer: Player.instance(startPlayerId).setName('').setImageUrl('/ball.svg'),
        endPlayer: Player.instance(endPlayerId).setName('').setImageUrl('/ball.svg'),
    }
}

const GAME_INFO_PROVIDERS = {
    [API_IMPLEMENTATIONS.TRANSFRMARKET]: getGameInfo,
    default: MOCK_GAME_INFO,
}

export default useGameInfoFromLocation
