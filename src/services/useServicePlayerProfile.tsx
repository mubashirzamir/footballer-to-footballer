import { Player } from '@/structures/Player.ts'
import { API_IMPLEMENTATION, API_IMPLEMENTATIONS } from '@/utils/constants.ts'
import useServicePlayerProfileTransfrMarket from '@/services/transfrmarket/player/useServiceProfile.tsx'
import useServicePlayerProfileMock from '@/services/mock/useServicePlayerProfile.tsx'

export interface UseServicePlayerProfileContract {
    (player: Player): {
        player: Player
        loading: boolean
        isError: boolean
        error: unknown
    }
}

// choose which implementation to use BEFORE calling the hook
const implementationMap = {
    [API_IMPLEMENTATIONS.TRANSFRMARKET]: useServicePlayerProfileTransfrMarket,
    [API_IMPLEMENTATIONS.MOCK]: useServicePlayerProfileMock,
}

const useServicePlayerProfile: UseServicePlayerProfileContract = (player: Player) => {
    const hookImpl = implementationMap[API_IMPLEMENTATION]

    // fallback to a no-op implementation
    const fallback = {
        player: player,
        loading: false,
        isError: false,
        error: null,
    }

    // if there’s no matching implementation, return fallback
    if (!hookImpl) return fallback

    // call the hook unconditionally
    return hookImpl(player)
}

export default useServicePlayerProfile
