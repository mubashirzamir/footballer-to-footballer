import { Input } from '@/components/ui/input.tsx'
import PlayerImage from '@/components/PlayerImage.tsx'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import { playerList } from '@/utils/mock.ts'

interface PlayerSelectionProps {
    team: Team
    setPlayer: (player: Player) => void
}

const PlayerSelection = (props: PlayerSelectionProps) => {
    const { team, setPlayer } = props
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        setTimeout(() => {
            setPlayers(playerList)
        }, DELAY)
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
                        <PlayerImage imageUrl={player.imageUrl} />
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
