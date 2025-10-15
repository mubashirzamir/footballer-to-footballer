import PlayableImage from '@/components/PlayableImage.tsx'
import { Player } from '@/structures/Player.ts'

interface PrimaryPlayerProps {
    player: Player
}

const PrimaryPlayer = (props: PrimaryPlayerProps) => {
    const { player } = props

    return (
        <div>
            <div className="md:size-80 sm:size-64 size-24">
                <PlayableImage imageUrl={player.imageUrl} />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-bold mt-4">{player.name}</span>
            </div>
        </div>
    )
}

export default PrimaryPlayer
