import { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import Search from '@/pages/Game/Search.tsx'
import type { Playable } from '@/structures/Playable.ts'
import PlayerCard from './PlayerCard.tsx'
import useSearch from '@/hooks/useSearch.tsx'
import SeasonSelector from '@/pages/Game/PlayerSelection/SeasonSelector.tsx'
import { useState } from 'react'
import useServicePlayers from '@/services/useServicePlayers.tsx'
import Error from '@/components/Error.tsx'
import Empty from '@/components/Empty.tsx'
import { scrollToTop } from '@/utils'

interface PlayerSelectionProps {
    team: Team
    updateGameState: (playable: Playable) => void
}

const PlayerSelection = (props: PlayerSelectionProps) => {
    const { team, updateGameState } = props

    const [season, setSeason] = useState(team.getSeasons()[0].id)

    const { players, loading, error } = useServicePlayers(team, season)
    const { filteredItems, handleSearchChange } = useSearch(players)

    const onSeasonChange = (seasonId: string) => setSeason(seasonId)

    const onPlayerSelect = (player: Player) => {
        scrollToTop()
        updateGameState(player)
    }

    if (loading) {
        return <BaseSpinner className="size-8" />
    }

    if (error) {
        return <Error error={error} />
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <SeasonSelector seasonId={season} seasons={team.getSeasons()} onChange={onSeasonChange} />
            </div>
            <div className="my-2">
                <Search onChange={handleSearchChange} />
            </div>
            {filteredItems.map((player) => (
                <PlayerCard player={player} onPlayerSelect={onPlayerSelect} />
            ))}
            <Empty length={players.length} message="No players to show." />
        </div>
    )
}

export default PlayerSelection
