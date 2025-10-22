import { useQuery } from '@tanstack/react-query'
import type { GameInfo, GameState } from '@/structures'
import type { UseServiceShortestPossiblePathContract } from '@/services/useServiceShortestPathPossible.tsx'
import { delay } from '@/utils'
import { DELAY } from '@/utils/constants.ts'
import { SHORTEST_PATH } from '@/services/mock/mock.ts'
import type { ShortestPathApiResponse } from '@/services/shortest-path/useServiceShortestPossiblePath.tsx'

const useServiceShortestPossiblePath: UseServiceShortestPossiblePathContract = (
    _gameInfo: GameInfo,
    gameState: GameState
) => {
    const isTodaysGame = true
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
            await delay(DELAY)

            return SHORTEST_PATH()
        },
        staleTime: Infinity,
        enabled: isTodaysGame,
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
