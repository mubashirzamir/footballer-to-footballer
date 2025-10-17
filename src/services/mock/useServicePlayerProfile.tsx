import type { UseServicePlayerProfileContract } from '@/services/useServicePlayerProfile.tsx'
import type { Player } from '@/structures/Player.ts'
import { useQuery } from '@tanstack/react-query'
import { delay } from '@/utils'
import { DELAY } from '@/utils/constants.ts'
import { DEHHYDRATED_TO_HYDRATED_PLAYERS } from '@/services/mock/mock.ts'

const useServicePlayerProfile: UseServicePlayerProfileContract = (dehydratedPlayer: Player) => {
    const {
        data: player = dehydratedPlayer,
        isLoading: loading,
        isError,
        error,
    } = useQuery({
        staleTime: Infinity,
        placeholderData: dehydratedPlayer,
        queryKey: ['player_profile', dehydratedPlayer.id],
        queryFn: async (): Promise<Player> => {
            await delay(DELAY)

            return DEHHYDRATED_TO_HYDRATED_PLAYERS()[dehydratedPlayer.id]
        },
    })

    return { player, loading, isError, error }
}

export default useServicePlayerProfile
