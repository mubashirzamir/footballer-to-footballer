import type { UseServicePlayerProfileContract } from '@/services/useServicePlayerProfile.tsx'
import type { Player } from '@/structures/Player.ts'

const useServicePlayerProfile: UseServicePlayerProfileContract = (player: Player) => {
    return {
        loading: false,
        isError: false,
        error: null,
        player: player,
    }
}

export default useServicePlayerProfile
