import { Player } from '@/structures/Player.ts'
import { useQuery } from '@tanstack/react-query'
import { type ClubPlayer, fetchClubPlayers } from '@/services/PlayersService.ts'
import { Logger } from '@/utils'
import type { Team } from '@/structures/Team.ts'

const usePlayers = (team: Team, seasonId: string) => {
    const { data: players, isLoading: loading } = useQuery({
        placeholderData: [],
        queryKey: ['players', team.id],
        queryFn: async (): Promise<Player[]> => {
            try {
                // TODO
                // @ts-ignore
                const response: ClubPlayerResponse = await fetchClubPlayers(team.id, seasonId)
                return transformClubPlayersToPlayers(response.players)
            } catch (error) {
                Logger.log('usePlayers:', error)
                return []
            }
        },
    })

    return { players, loading }
}

const transformClubPlayersToPlayers = (players: ClubPlayer[]): Player[] => {
    return players.map((p) => Player.instance(p.id).setName(p.name))
}

export default usePlayers
