import type { Team } from '@/structures/Team.ts'
import type { UseServicePlayersContract } from '@/services/useServicePlayers.tsx'
import { Player } from '@/structures/Player.ts'

const useServicePlayers: UseServicePlayersContract = (team: Team, seasonId: string) => {
    return {
        loading: false,
        isError: false,
        error: null,
        players: players,
    }
}

const players = [
    Player.instance('1').setName('Messi'),
    Player.instance('2').setName('Ronaldo'),
    Player.instance('3').setName('Neymar'),
    Player.instance('4').setName('Mbappe'),
]

export default useServicePlayers
