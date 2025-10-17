import type { Team } from '@/structures/Team.ts'
import type { UseServicePlayersContract } from '@/services/useServicePlayers.tsx'
import { PLAYERS } from '@/services/mock/mock.ts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useServicePlayers: UseServicePlayersContract = (_team: Team, _seasonId: string) => {
    return {
        loading: false,
        isError: false,
        error: null,
        players: PLAYERS(),
    }
}

export default useServicePlayers
