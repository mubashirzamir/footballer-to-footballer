import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import type { Playable } from '@/structures/Playable.ts'
import Search from '@/pages/Game/Search.tsx'
import TeamCard from './TeamCard.tsx'
import TurnInfo from '@/pages/Game/TurnInfo.tsx'
import useSearch from '@/hooks/useSearch.tsx'
import useServiceTransfers from '@/service-hooks/player/useServiceTransfers.ts'

interface TeamSelectionProps {
    player: Player
    updateGameState: (playable: Playable) => void
}

const TeamSelection = (props: TeamSelectionProps) => {
    const { player, updateGameState } = props

    const { teams, loading } = useServiceTransfers(player)
    // @ts-ignore // TODO
    const { filteredItems, handleSearchChange } = useSearch(teams)

    const onTeamSelect = (team: Team) => {
        updateGameState(team)
    }

    if (loading) {
        return <BaseSpinner className="size-8" />
    }

    return (
        <div>
            <TurnInfo>History of {player.name}</TurnInfo>
            <div className="my-2">
                <Search onChange={handleSearchChange} />
            </div>
            {filteredItems.map((team) => (
                <TeamCard team={team} onTeamSelect={onTeamSelect} />
            ))}
        </div>
    )
}

export default TeamSelection
