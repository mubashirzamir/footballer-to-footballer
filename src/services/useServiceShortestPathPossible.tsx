import { API_IMPLEMENTATION_SHORTEST_PATH, API_IMPLEMENTATIONS_SHORTEST_PATH } from '@/utils/constants.ts'
import useServiceShortestPossiblePathVercel from '@/services/shortest-path/useServiceShortestPossiblePath.tsx'
import useServiceShortestPossiblePathMock from '@/services/mock/useServiceShortestPossiblePath.tsx'
import type { GameInfo, GameState } from '@/structures'

export interface UseServiceShortestPossiblePathContract {
    (
        gameInfo: GameInfo,
        gameState: GameState
    ): {
        isTodaysGame: boolean
        isShortest: boolean
        message: string
        shortestPath: GameState
        loading: boolean
        isError: boolean
        error: unknown
    }
}

// choose which implementation to use BEFORE calling the hook
const implementationMap = {
    [API_IMPLEMENTATIONS_SHORTEST_PATH.VERCEL]: useServiceShortestPossiblePathVercel,
    [API_IMPLEMENTATIONS_SHORTEST_PATH.MOCK]: useServiceShortestPossiblePathMock,
}

export const useServiceShortestPossiblePath: UseServiceShortestPossiblePathContract = (
    gameInfo: GameInfo,
    gameState: GameState
) => {
    const hookImpl = implementationMap[API_IMPLEMENTATION_SHORTEST_PATH]

    // fallback to a no-op implementation
    const fallback = {
        isTodaysGame: true,
        isShortest: false,
        message: 'Fallback: No shortest path implementation found.',
        shortestPath: [],
        loading: false,
        isError: false,
        error: null,
    }

    // if there’s no matching implementation, return fallback
    if (!hookImpl) return fallback

    // call the hook unconditionally
    return hookImpl(gameInfo, gameState)
}

export default useServiceShortestPossiblePath
