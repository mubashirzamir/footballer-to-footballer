import Direction from '@/components/Direction.tsx'
import PlayableImage from '@/components/PlayableImage.tsx'
import type { Player } from '@/structures/Player.ts'
import Text from '@/components/Text.tsx'
import { useGameContext } from '@/hooks/useGameContext.tsx'

const GameSummary = () => {
    const { gameInfoContainer } = useGameContext()
    const { gameInfo } = gameInfoContainer

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center sm:space-x-4">
                <PlayableImageWithText player={gameInfo.startPlayer} />
                <Direction mutable={true} className="text-4xl max-w-[2rem]" />
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
        <div className="flex flex-col items-center">
            <div className="w-24 h-24">
                <PlayableImage imageUrl={player.imageUrl} />
            </div>
            <div className="flex flex-col items-center">
                <Text text={player.name} className="font-bold min-h-[3rem] w-[8rem] sm:w-[16rem] md:w-[20rem] mt-2" />
            </div>
        </div>
    )
}

export default GameSummary
