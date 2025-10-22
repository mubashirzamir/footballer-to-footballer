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
 * TODO:
 * 1. Function runs at 11:59:59 and isTodaysGame is true
 * 2. const date = new Date().toLocaleDateString('en-CA') changes to next day
 * 3. Request is sent with a today's date but yesterday's game info causing a mismatch
 */
const useServiceShortestPossiblePath: UseServiceShortestPossiblePathContract = (
    gameInfo: GameInfo,
    gameState: GameState
) => {
    const todaysGameInfo = getGameInfo()
    const isTodaysGame =
        todaysGameInfo.startPlayer.id === gameInfo.startPlayer.id &&
        todaysGameInfo.endPlayer.id === gameInfo.endPlayer.id

    const date = new Date().toLocaleDateString('en-CA')

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
        queryKey: ['shortest_path', date, gameState],
        queryFn: async (): Promise<ShortestPathApiResponse> => {
            return await fetchShortestPath({ date, path: gameState })
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
