import request from '@/request.js'
import { Player } from '@/structures/Player.ts'
import { useQuery } from '@tanstack/react-query'
import type { Team } from '@/structures/Team.ts'
import type { UseServicePlayersContract } from '@/services/useServicePlayers.tsx'

type ClubPlayersResponse = {
    id: string
    updatedAt: string
    players: ClubPlayer[]
}

type ClubPlayer = {
    id: string
    name: string
    image: string | undefined
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

const fetchPlayers = async (clubId: string, seasonId: string): Promise<ClubPlayersResponse> => {
    return await request.get(`/clubs/${clubId}/players`, { params: { season_id: seasonId } })
}

const useServicePlayers: UseServicePlayersContract = (team: Team, seasonId: string) => {
    const {
        data: players = [],
        isLoading: loading,
        isError,
        error,
    } = useQuery({
        placeholderData: [], // TODO: Placeholder vs Initial Data?
        queryKey: ['players', team.id, seasonId],
        queryFn: async (): Promise<Player[]> => {
            const response: ClubPlayersResponse = await fetchPlayers(team.id, seasonId)

            return transformClubPlayersToPlayers(response.players)
        },
    })

    return { players, loading, error, isError }
}

const transformClubPlayersToPlayers = (players: ClubPlayer[]): Player[] => {
    return players.map((p) =>
        Player.instance(p.id)
            .setName(p.name)
            .setImageUrl(p.image || '')
    )
}

export default useServicePlayers
