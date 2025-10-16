import request from '@/request.js'
import { Player } from '@/structures/Player.ts'
import { useQuery } from '@tanstack/react-query'
import { Logger } from '@/utils'
import type { Team } from '@/structures/Team.ts'

type ClubPlayersResponse = {
    id: string
    updatedAt: string
    players: ClubPlayer[]
}

type ClubPlayer = {
    id: string
    name: string
    position: string
    dateOfBirth: string
    age: number
    nationality: string[]
    currentClub: string
    height: number
    foot: string
    joinedOn: string
    joined: string
    signedFrom: string
    contract: string
    marketValue: number
    status: string
}

const fetchPlayers = async (clubId: string, seasonId: string): Promise<ClubPlayersResponse[]> => {
    return await request.get(`/clubs/${clubId}/players`, { params: { season_id: seasonId } })
}

const useServicePlayers = (team: Team, seasonId: string) => {
    const { data: players, isLoading: loading } = useQuery({
        placeholderData: [],
        queryKey: ['players', team.id],
        queryFn: async (): Promise<Player[]> => {
            try {
                // @ts-ignore // TODO
                const response: ClubPlayerResponse = await fetchPlayers(team.id, seasonId)
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

export default useServicePlayers
