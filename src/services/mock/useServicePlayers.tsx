import { useQuery } from '@tanstack/react-query'
import type { Team } from '@/structures/Team.ts'
import type { UseServicePlayersContract } from '@/services/useServicePlayers.tsx'
import { PLAYERS } from '@/services/mock/mock.ts'
import type { Player } from '@/structures/Player.ts'
import { DELAY } from '@/utils/constants.ts'
import { delay } from '@/utils'

const useServicePlayers: UseServicePlayersContract = (team: Team, seasonId: string) => {
    const {
        data: players = [],
        isLoading: loading,
        isError,
        error,
    } = useQuery<Player[]>({
        staleTime: Infinity,
        queryKey: ['players', team.id, seasonId],
        queryFn: async () => {
            await delay(DELAY)
            return PLAYERS()
        },
    })

    return { players, loading, error, isError }
}

export default useServicePlayers
