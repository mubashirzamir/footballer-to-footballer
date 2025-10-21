import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
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
import { useGameStateContext } from '@/contexts-providers/game-state/useGameStateContext.tsx'

interface TeamSelectionProps {
    player: Player
}

const TeamSelection = (props: TeamSelectionProps) => {
    const { player } = props

    const { append } = useGameStateContext()
    const { teams, loading, error } = useServiceTeams(player)
    const { filteredItems, setQuery, handleSearchChange } = useSearch(teams)

    const onTeamSelect = (team: Team) => {
        if (team.withoutClub) return

        scrollToTop()
        setQuery('')
        append(team)
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
                <Text className="text-lg">
                    {__.messages.game.team_selection.history_of} {player.name}
                </Text>
            </TurnInfo>
            <div className="my-2">
                <Search onChange={handleSearchChange} />
            </div>
            {filteredItems.map((team, index) => (
                <TeamCard key={`${index}_${team.id}`} team={team} onTeamSelect={onTeamSelect} />
            ))}
            <Empty length={teams.length} message={__.messages.game.team_selection.no_teams} />
        </div>
    )
}

export default TeamSelection
