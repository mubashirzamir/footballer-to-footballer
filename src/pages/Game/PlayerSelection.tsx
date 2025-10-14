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

    return (
        <div>
            <div className="mb-2 text-lg font-medium flex justify-center">
                {team.startDate} - {team.endDate}
            </div>
            <Search />
            <hr />

            {players.map((player) => (
                <div
                    key={player.id}
                    className="flex flex-row items-center gap-12 mt-4 cursor-pointer"
                    onClick={() => onPlayerSelect(player)}
                >
                    <div className="size-36">
                        <PlayerImage />
                    </div>
                    <span>{player.name}</span>
                </div>
            ))}
        </div>
    )
}

const Search = () => {
    return <Input name="search" placeholder="Search player..." />
}

export default PlayerSelection
