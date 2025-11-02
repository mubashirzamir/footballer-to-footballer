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
 * todaysGameInfo.date is used for API calls instead of gameInfo date because the gameInfo.date is always the current date.
 * Whereas, todaysGameInfo.date falls back to the DEFAULT_GAME_DATE when there is no new game.
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
            return await fetchShortestPath({ date: todaysGameInfo.date, path: gameState })
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
