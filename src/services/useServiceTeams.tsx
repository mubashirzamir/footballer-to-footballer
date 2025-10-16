import { API_IMPLEMENTATION, API_IMPLEMENTATIONS } from '@/utils/constants.ts'
import type { Team } from '@/structures/Team.ts'
import type { Player } from '@/structures/Player.ts'
import useServiceTeamsTransfermarkt from '@/services/transfrmarket/player/useServiceTransfers.tsx'

export interface UseServiceTeamsContract {
    (player: Player): {
        teams: Team[]
        loading: boolean
        isError: boolean
        error: unknown
    }
}

// choose which implementation to use BEFORE calling the hook
const implementationMap = {
    [API_IMPLEMENTATIONS.TRANSFRMARKET]: useServiceTeamsTransfermarkt,
    // add other implementations later:
    // [API_IMPLEMENTATIONS.FBREF]: useServiceTeamsFbref,
}

export const useServiceTeams: UseServiceTeamsContract = (player: Player) => {
    const hookImpl = implementationMap[API_IMPLEMENTATION]

    // fallback to a no-op implementation
    const fallback = {
        teams: [],
        loading: false,
        isError: false,
        error: null,
    }

    // if there’s no matching implementation, return fallback
    if (!hookImpl) return fallback

    // ✅ call the hook unconditionally
    return hookImpl(player)
}

export default useServiceTeams
