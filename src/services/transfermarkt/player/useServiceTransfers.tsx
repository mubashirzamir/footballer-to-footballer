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

const today = new Date().toLocaleDateString('en-CA')

const transformTransfersToTeams = (transfers: Transfer[]): Team[] => {
    if (transfers.length === 0) return []

    const result = []

    for (let i = 0; i < transfers.length; i++) {
        const transfer = transfers[i]
        const nextTransfer = transfers[i - 1] // Next transfer chronologically

        if (transfer.upcoming) continue // Skip upcoming transfers

        const team = new Team(transfer.clubTo.id)
            .setName(transfer.clubTo.name)
            .setStartDate(transfer.date)
            .setEndDate(nextTransfer ? nextTransfer.date : today)
            .setSeasonStart(transfer.season)
            .setSeasonEnd(beforeSettingSeasonEnd(transfer, nextTransfer))
            .setImageUrl(teamImageSource.replace('PLACEHOLDER', transfer.clubTo.id))
            .setWithoutClub(isWithoutClub(transfer.clubTo.name))

        if (shouldAddTeam(team)) result.push(team)
    }

    return result
}

const isWithoutClub = (teamName: string): boolean => {
    const lowerCaseName = teamName.trim().toLowerCase()

    return lowerCaseName === 'without club'
}

const shouldAddTeam = (team: Team): boolean => {
    return team.name.trim().toLowerCase() !== 'retired'
}

const currentSeason = new Date().getMonth() >= 7 ? new Date().getFullYear() : new Date().getFullYear() - 1
const currentSeasonString = Team.convertYearToSeason(currentSeason)

/**
 * TODO:
 *  1. Document behavior and make this function cleaner.
 *  2. Write tests.
 *  3. Add this info in the about and caveats that transfers are handled this way.
 *
 * Note: New season starts from 1 July on Transfermarkt
 * Tested: players
 * Torres: 7767
 * Dier: 175722
 * Xavi: 7607
 */
const beforeSettingSeasonEnd = (transfer: Transfer, nextTransfer: Transfer | undefined) => {
    if (!nextTransfer) {
        return currentSeasonString // e.g. "23/24"
    }

    const seasonYear = Team.convertToYear(transfer.season) // e.g., "04/05" -> 2004
    const nextTransferSeasonYear = Team.convertToYear(nextTransfer.season) // e.g., "05/06" -> 2005

    // Sanity checks
    if (seasonYear >= nextTransferSeasonYear) return transfer.season // e.g. "04/05"

    const [year, day, month] = nextTransfer.date.split('-') // e.g. "2005-07-15"
    const nextTransferDate = new Date(parseInt(year), parseInt(month), parseInt(day)) // e.g. 15 July 2005
    const deadlineDay = new Date(parseInt(year), 7, 1) // e.g. 1 July 2005
    const splitPosition = nextTransferDate > deadlineDay ? 1 : 0

    const seasonHalf = parseInt(nextTransfer.season.split('/')[splitPosition]) // e.g. "05/06" ->  05 if splitPosition is 0 or 06 if splitPosition is 1

    // handle 00 -> 99 transition
    if (seasonHalf === 0) {
        return `99/00`
    }

    return `${seasonHalf - 1}`.padStart(2, '0') + '/' + `${seasonHalf}`.padStart(2, '0') // e.g. "05/06"
}

export default useServiceTransfers
