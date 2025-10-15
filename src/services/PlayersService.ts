import request from '@/request.js'

export type ClubPlayersResponse = {
    id: string
    updatedAt: string
    players: ClubPlayer[]
}

export type ClubPlayer = {
    id: string
    name: string
    position: string
    dateOfBirth: string
    age: number
    nationality: string[],
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

// Season ID example: '2023', '2024'
export const fetchClubPlayers = async (clubId: string, seasonId: string): Promise<ClubPlayersResponse[]> => {
    return await request.get(`/clubs/${clubId}/players`, { params: { season_id: seasonId } })
}
