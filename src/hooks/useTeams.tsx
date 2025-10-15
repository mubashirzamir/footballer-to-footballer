import { Player } from '@/structures/Player.ts'
import { useQuery } from '@tanstack/react-query'
import { fetchTransfers, type Transfer, type TransferResponse } from '@/services/TeamsService.ts'
import { Team } from '@/structures/Team.ts'
import { Logger } from '@/utils'

const useTeams = (player: Player) => {
    const { data: teams, isLoading: loading } = useQuery({
        placeholderData: [],
        queryKey: ['teams', player.id],
        queryFn: async (): Promise<Team[]> => {
            try {
                // TODO
                // @ts-ignore
                const response: TransferResponse = await fetchTransfers(player.id)
                return transformTransfersToTeams(response.transfers)
            } catch (error) {
                Logger.log('useTeams:', error)
                return []
            }
        },
    })

    return { teams, loading }
}

const transformTransfersToTeams = (transfers: Transfer[]): Team[] => {
    if (transfers.length === 0) return []

    const result = []

    for (let i = 0; i < transfers.length; i++) {
        const transfer = transfers[i]
        const previousTransfer = transfers[i - 1]
        const team = new Team(transfer.clubTo.id)
            .setName(transfer.clubTo.name)
            .setStartDate(transfer.date)
            .setEndDate(previousTransfer ? previousTransfer.date : 'Present')
            .setSeason(transfer.season)

        if (shouldAddTeam(team)) result.push(team)
    }

    return result
}

const shouldAddTeam = (team: Team): boolean => {
    return team.name.trim().toLowerCase() !== 'retired'
}

export default useTeams
