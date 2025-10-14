import { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import Search from '@/pages/Game/Search.tsx'
import usePlayers from '@/hooks/usePlayers.tsx'
import type { Playable } from '@/structures/Playable.ts'
import PlayerCard from '@/components/PlayerCard.tsx'
import TurnInfo from '@/components/TurnInfo.tsx'

interface PlayerSelectionProps {
    team: Team
    updateGameState: (playable: Playable) => void
}

const PlayerSelection = (props: PlayerSelectionProps) => {
    const { team, updateGameState } = props

    const { players, loading } = usePlayers(team)

    const onPlayerSelect = (player: Player) => {
        updateGameState(player)
    }

    if (loading) {
        return <BaseSpinner className="size-8" />
    }

    return (
        <div>
            <TurnInfo>
                {team.startDate} - {team.endDate}
            </TurnInfo>
            <div className="my-2">
                <Search />
            </div>
            {players.map((player) => (
                <PlayerCard player={player} onPlayerSelect={onPlayerSelect} />
            ))}
        </div>
    )
}

export default PlayerSelection
