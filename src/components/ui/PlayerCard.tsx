import PlayerImage from '@/components/PlayerImage.tsx'
import { Player } from '@/structures/Player.ts'

interface PlayerProps {
    player: Player
    onPlayerSelect: (player: Player) => void
}

const PlayerCard = ({ player, onPlayerSelect }: PlayerProps) => {
    return (
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
    )
}

export default PlayerCard
