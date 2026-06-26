import { useQuery } from '@tanstack/react-query'
import request from '@/request.ts'
import type { Playable } from '@/structures/Playable.ts'
import type { GameInfo, GameState } from '@/structures'
import { getGameInfo } from '@/hooks/useGameInfoFromDb.tsx'
import type { UseServiceShortestPossiblePathContract } from '@/services/useServiceShortestPathPossible.tsx'

export interface ShortestPathApiResponse {
    isShortest: boolean
    message: string
    shortestPath: Playable[]
    error?: string
}

export interface ShortestPathApiRequest {
    date: string
    path: Playable[]
}

const fetchShortestPath = async (body: ShortestPathApiRequest): Promise<ShortestPathApiResponse> => {
    return await request.post('/shortest-path', body, {
        baseURL: import.meta.env.VITE_API_SHORTEST_PATH_BASE_URL,
    })
}

/**
 * Submits the completed path to the Shortest Path KV store (keyed by date).
 *
 * Path normalization:
 * The KV stores paths in canonical order (start→end). If the user flipped
 * direction (isReversed), the gameState is reversed before submission so the
 * stored path is always start→end. The API response is reversed back so the
 * UI displays in the user's current orientation.
 *
 * Midnight cross-over:
 * Not a practical concern — games complete in <1 minute, and getGameInfo()
 * captures the date at render time. Even if a game straddles midnight, the
 * KV key (date) is the date the game was started, which is the correct
 * archival bucket.
 */
const useServiceShortestPossiblePath: UseServiceShortestPossiblePathContract = (
    gameInfo: GameInfo,
    gameState: GameState
) => {
    const todaysGameInfo = getGameInfo()
    const isRegular =
        todaysGameInfo.startPlayer.id === gameInfo.startPlayer.id &&
        todaysGameInfo.endPlayer.id === gameInfo.endPlayer.id
    const isReversed =
        todaysGameInfo.startPlayer.id === gameInfo.endPlayer.id &&
        todaysGameInfo.endPlayer.id === gameInfo.startPlayer.id
    const isTodaysGame = isRegular || isReversed

    const {
        data = {
            isShortest: false,
            message: '',
            shortestPath: [],
        },
        isLoading,
        isError,
        error,
    } = useQuery<ShortestPathApiResponse>({
        queryKey: ['shortest_path', todaysGameInfo.date, gameState],
        queryFn: async (): Promise<ShortestPathApiResponse> => {
            const path = isReversed ? [...gameState].reverse() : gameState

            const response = await fetchShortestPath({ date: todaysGameInfo.date, path })

            if (isReversed) {
                response.shortestPath.reverse();
            }

            return response
        },
        staleTime: Infinity,
        enabled: isTodaysGame, // only run the query if it's today's game
    })

    return {
        isTodaysGame: isTodaysGame,
        ...data,
        loading: isLoading,
        isError,
        error,
    }
}

export default useServiceShortestPossiblePath
