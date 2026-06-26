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
            .setSeasonEnd(calculateSeasonEnd(transfer, nextTransfer, currentSeasonString))
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

const JULY = 7

interface SeasonEndTransfer {
    season: string
    date: string
}

/**
 * Calculates the season end string for a player's club tenure.
 *
 * Transfermarkt seasons are formatted as "04/05" (July 2004 – June 2005).
 * When a player moves between clubs, this function determines the season
 * end for the current club based on when the next transfer occurred:
 *
 * - If no next transfer → the player is still at the club, use current season
 * - If next transfer is in a same/earlier season year → return transfer's season as-is
 * - If next transfer is after July 1 → player left at season boundary, return next transfer's season
 * - If next transfer is before/on July 1 → player left mid-season, return prior season
 */
export const calculateSeasonEnd = (
    transfer: SeasonEndTransfer,
    nextTransfer: SeasonEndTransfer | undefined,
    currentSeasonString: string,
): string => {
    if (!nextTransfer) return currentSeasonString

    const seasonYear = Team.convertToYear(transfer.season)
    const nextTransferSeasonYear = Team.convertToYear(nextTransfer.season)

    if (seasonYear >= nextTransferSeasonYear) return transfer.season

    const [yearStr, monthStr, dayStr] = nextTransfer.date.split('-')
    const nextTransferDate = new Date(Number(yearStr), Number(monthStr), Number(dayStr))
    const deadlineDay = new Date(Number(yearStr), JULY, 1)
    const halfIndex = nextTransferDate > deadlineDay ? 1 : 0

    const halfValue = Number(nextTransfer.season.split('/')[halfIndex])

    if (halfValue === 0) return '99/00'

    return `${String(halfValue - 1).padStart(2, '0')}/${String(halfValue).padStart(2, '0')}`
}

export default useServiceTransfers
