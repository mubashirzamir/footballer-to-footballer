import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import type { Playable } from '@/structures/Playable.ts'
import Search from '@/pages/Game/Search.tsx'
import TeamCard from './TeamCard.tsx'
import TurnInfo from '@/pages/Game/TurnInfo.tsx'
import useSearch from '@/hooks/useSearch.tsx'
import useServiceTeams from '@/services/useServiceTeams.tsx'
import Error from '@/components/Error.tsx'
import Empty from '@/components/Empty.tsx'
import Text from '@/components/Text.tsx'
import { scrollToTop } from '@/utils'
import { __ } from '@/lang/lang.ts'

interface TeamSelectionProps {
    player: Player
    updateGameState: (playable: Playable) => void
}

const TeamSelection = (props: TeamSelectionProps) => {
    const { player, updateGameState } = props

    const { teams, loading, error } = useServiceTeams(player)
    const { filteredItems, handleSearchChange } = useSearch(teams)

    const onTeamSelect = (team: Team) => {
        if (team.withoutClub) return

        scrollToTop()
        updateGameState(team)
    }

    if (loading) {
        return <BaseSpinner className="size-8" />
    }

    if (error) {
        return <Error error={error} />
    }

    return (
        <div>
            <TurnInfo>
                <Text className="text-lg">{__.messages.history_of} {player.name}</Text>
            </TurnInfo>
            <div className="my-2">
                <Search onChange={handleSearchChange} />
            </div>
            {filteredItems.map((team) => (
                <TeamCard key={team.id} team={team} onTeamSelect={onTeamSelect} />
            ))}
            <Empty length={teams.length} message={__.messages.no_teams} />
        </div>
    )
}

export default TeamSelection
