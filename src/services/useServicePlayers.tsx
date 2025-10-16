import type { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import { API_IMPLEMENTATION, API_IMPLEMENTATIONS } from '@/utils/constants.ts'
import useServicePlayersTransfermarkt from '@/services/transfrmarket/club/useServicePlayers.tsx'

export interface UseServicePlayersContract {
    (
        team: Team,
        seasonId: string
    ): {
        players: Player[]
        loading: boolean
        isError: boolean
        error: unknown
    }
}

// choose which implementation to use BEFORE calling the hook
const implementationMap = {
    [API_IMPLEMENTATIONS.TRANSFRMARKET]: useServicePlayersTransfermarkt,
    // add other implementations later:
    // [API_IMPLEMENTATIONS.FBREF]: useServicePlayersFbref,
}

const useServicePlayers: UseServicePlayersContract = (team: Team, seasonId: string) => {
    const hookImpl = implementationMap[API_IMPLEMENTATION]

    // fallback to a no-op implementation
    const fallback = {
        players: [],
        loading: false,
        isError: false,
        error: null,
    }

    // if there’s no matching implementation, return fallback
    if (!hookImpl) return fallback

    // ✅ call the hook unconditionally
    return hookImpl(team, seasonId)
}

export default useServicePlayers
