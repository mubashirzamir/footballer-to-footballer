import Direction from '@/components/Direction.tsx'
import PlayableImage from '@/components/PlayableImage.tsx'
import type { GameInfo } from '@/structures'

interface GameSummaryProps {
    gameInfo: GameInfo
}

const GameSummary = ({ gameInfo }: GameSummaryProps) => {
    // TODO: Add name on hover
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center space-x-8">
                <div className="size-24">
                    <PlayableImage imageUrl={gameInfo.startPlayer.imageUrl} />
                </div>
                <Direction mutable={true} className="text-2xl" />
                <div className="size-24">
                    <PlayableImage imageUrl={gameInfo.endPlayer.imageUrl} />
                </div>
            </div>
        </div>
    )
}

export default GameSummary
