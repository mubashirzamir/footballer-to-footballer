import request from '@/request.js'
import { Player } from '@/structures/Player.ts'
import { useQuery } from '@tanstack/react-query'
import { Team } from '@/structures/Team.ts'
import type { UseServiceTeamsContract } from '@/services/useServiceTeams.tsx'
import { DELAY, RETRY_ATTEMPTS } from '@/utils/constants.ts'

const teamImageSource: string = import.meta.env.VITE_TEAM_IMAGE_SOURCE

type TransferResponse = {
    id: string
    transfers: Transfer[]
    updatedAt: string
    youthClubs: string[]
}

type Transfer = {
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

export const getTransfers = async (playerId: string): Promise<TransferResponse> => {
    return await request.get(`/players/${playerId}/transfers`)
}

const useServiceTransfers: UseServiceTeamsContract = (player: Player) => {
    const {
        data: teams = [],
        isLoading: loading,
        isError,
        error,
    } = useQuery({
        retryDelay: DELAY,
        retry: RETRY_ATTEMPTS,
        staleTime: Infinity,
        queryKey: ['teams', player.id],
        queryFn: async (): Promise<Team[]> => {
            const response: TransferResponse = await getTransfers(player.id)

            return transformTransfersToTeams(response.transfers)
        },
    })

    return { teams, loading, isError, error }
}

const transformTransfersToTeams = (transfers: Transfer[]): Team[] => {
    if (transfers.length === 0) return []

    const result = []

    // TODO: utils or move somewhere else
    const today = new Date().toISOString()
    const currentSeason = new Date().getMonth() >= 7 ? new Date().getFullYear() : new Date().getFullYear() - 1
    const currentSeasonString = Team.convertYearToSeason(currentSeason)

    for (let i = 0; i < transfers.length; i++) {
        const transfer = transfers[i]
        const nextTransfer = transfers[i - 1] // Next transfer chronologically

        const team = new Team(transfer.clubTo.id)
            .setName(transfer.clubTo.name)
            .setStartDate(transfer.date)
            .setEndDate(nextTransfer ? nextTransfer.date : today)
            .setSeasonStart(transfer.season)
            .setSeasonEnd(nextTransfer ? beforeSettingSeasonEnd(nextTransfer.season) : currentSeasonString)
            .setImageUrl(teamImageSource.replace('PLACEHOLDER', transfer.clubTo.id))
            .setWithoutClub(isWithoutClub(transfer.clubTo.name))

        if (shouldAddTeam(team)) result.push(team)
    }

    return result
}

// TODO: Can we handle january transfers better?
// TODO: Add this info in the about and caveats that january transfers are handled this way
const beforeSettingSeasonEnd = (season: string) => {
    const firstHalf = parseInt(season.split('/')[0])

    return `${firstHalf - 1}`.padStart(2, '0') + '/' + `${firstHalf}`.padStart(2, '0')
}

const isWithoutClub = (teamName: string): boolean => {
    const lowerCaseName = teamName.trim().toLowerCase()

    return lowerCaseName === 'without club'
}

const shouldAddTeam = (team: Team): boolean => {
    return team.name.trim().toLowerCase() !== 'retired'
}

export default useServiceTransfers
