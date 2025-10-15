import request from '@/request.js'

export type TransferResponse = {
    id: string
    transfers: Transfer[]
    updatedAt: string
    youthClubs: string[]
}

export type Transfer = {
    id: string
    clubFrom: {
        id: string
        name: string
    }
    clubTo: {
        id: string
        name: string
    }
    date: string
    upcoming: boolean
    season: string
    marketValue: number
}

export const fetchTransfers = async (playerId: string): Promise<TransferResponse[]> => {
    return await request.get(`/players/${playerId}/transfers`)
}
