import PlayerImage from '@/components/PlayerImage.tsx'
import { type Player } from '@/hooks/useGameInfo.tsx'

interface PrimaryPlayerProps {
    player: Player
}

const PrimaryPlayer = (props: PrimaryPlayerProps) => {
    const { player } = props

    return (
        <div>
            <div className="md:size-80 sm:size-64 size-24">
                <PlayerImage imageUrl={player.imageUrl} />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-bold mt-4">{player.name}</span>
            </div>
        </div>
    )
}

export default PrimaryPlayer
