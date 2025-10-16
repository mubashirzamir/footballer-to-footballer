import type { Player } from '@/structures/Player.ts'
import type { UseServiceTeamsContract } from '@/services/useServiceTeams.tsx'
import { Team } from '@/structures/Team.ts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useServiceTeams: UseServiceTeamsContract = (_player: Player) => {
    return {
        loading: false,
        isError: false,
        error: null,
        teams: teams,
    }
}

const teams = [
    Team.instance('1').setName('Barcelona').setSeasonStart('23/24').setSeasonEnd('24/25'),
    Team.instance('2').setName('PSG').setSeasonStart('23/24').setSeasonEnd('24/25'),
    Team.instance('3').setName('Juventus').setSeasonStart('22/23').setSeasonEnd('23/24'),
    Team.instance('4').setName('Manchester City').setSeasonStart('21/22').setSeasonEnd('22/23'),
]
export default useServiceTeams
