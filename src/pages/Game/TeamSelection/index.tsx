import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import type { Playable } from '@/structures/Playable.ts'
import useTeams from '@/hooks/useTeams.tsx'
import Search from '@/pages/Game/Search.tsx'
import TeamCard from './TeamCard.tsx'
import TurnInfo from '@/pages/Game/TurnInfo.tsx'

interface TeamSelectionProps {
    player: Player
    updateGameState: (playable: Playable) => void
}

const Index = (props: TeamSelectionProps) => {
    const { player, updateGameState } = props

    const { teams, loading } = useTeams(player)

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
                <Search />
            </div>
            {teams.map((team) => (
                <TeamCard team={team} onTeamSelect={onTeamSelect} />
            ))}
        </div>
    )
}

export default Index
