import { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import Search from '@/pages/Game/Search.tsx'
import PlayerCard from './PlayerCard.tsx'
import useSearch from '@/hooks/useSearch.tsx'
import SeasonSelector from '@/pages/Game/PlayerSelection/SeasonSelector.tsx'
import { useState } from 'react'
import useServicePlayers from '@/services/useServicePlayers.tsx'
import Error from '@/components/Error.tsx'
import Empty from '@/components/Empty.tsx'
import { scrollToTop } from '@/utils'
import { __ } from '@/lang/lang.ts'
import { useGameStateContext } from '@/contexts-providers/game-state/useGameStateContext.tsx'

interface PlayerSelectionProps {
    team: Team
}

const PlayerSelection = (props: PlayerSelectionProps) => {
    const { team } = props

    const { append } = useGameStateContext()
    const [season, setSeason] = useState(team.getSeasons()[0].id)

    const { players, loading, error } = useServicePlayers(team, season)
    const { filteredItems, setQuery, handleSearchChange } = useSearch(players)

    const onSeasonChange = (seasonId: string) => {
        setQuery('')
        setSeason(seasonId)
    }

    const onPlayerSelect = (player: Player) => {
        scrollToTop()
        setQuery('')
        append(player)
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
                <PlayerCard key={player.id} player={player} onPlayerSelect={onPlayerSelect} />
            ))}
            <Empty length={players.length} message={__.messages.game.player_selection.no_players} />
        </div>
    )
}

export default PlayerSelection
