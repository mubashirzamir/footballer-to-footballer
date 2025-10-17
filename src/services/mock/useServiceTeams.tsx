import type { Player } from '@/structures/Player.ts'
import type { UseServiceTeamsContract } from '@/services/useServiceTeams.tsx'
import { TEAMS } from '@/services/mock/mock.ts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useServiceTeams: UseServiceTeamsContract = (_player: Player) => {
    return {
        loading: false,
        isError: false,
        error: null,
        teams: TEAMS(),
    }
}

export default useServiceTeams
