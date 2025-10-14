import { Input } from '@/components/ui/input.tsx'
import PlayerImage from '@/components/PlayerImage.tsx'
import type { Team } from '@/pages/Game/index.tsx'
import { type Player, playerList } from '@/hooks/useGameInfo.tsx'
import { useEffect, useState } from 'react'

interface PlayerSelectionProps {
    team: Team
    setPlayer: (player: Player) => void
}

const PlayerSelection = (props: PlayerSelectionProps) => {
    const { team, setPlayer } = props
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        setPlayers(playerList)
    }, [team])

    const onPlayerSelect = (player: Player) => {
        setPlayer(player)
    }

    // TODO: Why size difference between PlayerSelection and TeamSelection on mobile?
    // TODO: Lots of overlap between PlayerSelection and TeamSelection. Refactor.
    return (
        <div>
            <div className="text-xl font-medium flex justify-center">
                {team.startDate} - {team.endDate}
            </div>
            <div className="my-2">
                <Search />
            </div>
            {players.map((player) => (
                <div
                    key={player.id}
                    className="flex flex-row items-center gap-4 cursor-pointer hover:bg-muted p-2"
                    onClick={() => onPlayerSelect(player)}
                >
                    <div className="size-32">
                        <PlayerImage />
                    </div>
                    <span>{player.name}</span>
                </div>
            ))}
        </div>
    )
}

export const Search = () => {
    return <Input name="search" placeholder="Filter:" />
}

export default PlayerSelection
