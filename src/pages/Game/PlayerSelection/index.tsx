import { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import Search from '@/pages/Game/Search.tsx'
import usePlayers from '@/hooks/usePlayers.tsx'
import type { Playable } from '@/structures/Playable.ts'
import PlayerCard from './PlayerCard.tsx'
import TurnInfo from '@/pages/Game/TurnInfo.tsx'
import useSearch from '@/hooks/useSearch.tsx'
import SeasonSelector from '@/pages/Game/PlayerSelection/SeasonSelector.tsx'
import { useState } from 'react'

interface PlayerSelectionProps {
    team: Team
    updateGameState: (playable: Playable) => void
}

const Index = (props: PlayerSelectionProps) => {
    const { team, updateGameState } = props

    const [season, setSeason] = useState(team.getSeasons()[0].id)

    const { players, loading } = usePlayers(team, season)
    const { filteredItems, handleSearchChange } = useSearch(players) // TODO

    const onSeasonChange = (seasonId: string) => setSeason(seasonId)

    const onPlayerSelect = (player: Player) => {
        updateGameState(player)
    }

    if (loading) {
        return <BaseSpinner className="size-8" />
    }

    return (
        <div>
            <TurnInfo>
                <SeasonSelector seasonId={season} seasons={team.getSeasons()} onChange={onSeasonChange} />
            </TurnInfo>
            <div className="my-2">
                <Search onChange={handleSearchChange} />
            </div>
            {filteredItems.map((player) => (
                <PlayerCard player={player} onPlayerSelect={onPlayerSelect} />
            ))}
        </div>
    )
}

export default Index
