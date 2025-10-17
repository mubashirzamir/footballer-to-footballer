import Direction from '@/components/Direction.tsx'
import PlayableImage from '@/components/PlayableImage.tsx'
import type { GameInfo } from '@/structures'
import type { Player } from '@/structures/Player.ts'
import Text from '@/components/Text.tsx'

interface GameSummaryProps {
    gameInfo: GameInfo
}

const GameSummary = ({ gameInfo }: GameSummaryProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center space-x-8">
                <PlayableImageWithText player={gameInfo.startPlayer} />
                <Direction mutable={true} className="text-2xl" />
                <PlayableImageWithText player={gameInfo.endPlayer} />
            </div>
        </div>
    )
}

interface PlayableImageWithTextProps {
    player: Player
}

const PlayableImageWithText = ({ player }: PlayableImageWithTextProps) => {
    return (
        <div>
            <div className="size-24">
                <PlayableImage imageUrl={player.imageUrl} />
            </div>
            <div className="flex flex-col items-center">
                <Text text={player.name} className="max-w-[10rem] mt-2" />
            </div>
        </div>
    )
}

export default GameSummary
