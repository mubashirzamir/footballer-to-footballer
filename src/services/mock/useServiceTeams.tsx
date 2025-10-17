import type { Player } from '@/structures/Player.ts'
import type { UseServiceTeamsContract } from '@/services/useServiceTeams.tsx'
import { TEAMS } from '@/services/mock/mock.ts'
import { useQuery } from '@tanstack/react-query'
import { Team } from '@/structures/Team.ts'
import { delay } from '@/utils'
import { DELAY } from '@/utils/constants.ts'

const useServiceTeams: UseServiceTeamsContract = (player: Player) => {
    const {
        data: teams = [],
        isLoading: loading,
        isError,
        error,
    } = useQuery({
        staleTime: Infinity,
        queryKey: ['teams', player.id],
        queryFn: async (): Promise<Team[]> => {
            await delay(DELAY)
            return TEAMS()
        },
    })

    return { teams, loading, isError, error }
}

export default useServiceTeams
