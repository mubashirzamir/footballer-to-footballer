import PlayableImage from '@/components/PlayableImage.tsx'
import { Player } from '@/structures/Player.ts'
import Text from '@/components/Text.tsx'

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
            <div className="w-24 h-24 md:w-32 md:h-32">
                <PlayableImage imageUrl={player.imageUrl} />
            </div>
            <Text className="text-start font-bold">{player.name}</Text>
        </div>
    )
}

export default PlayerCard
