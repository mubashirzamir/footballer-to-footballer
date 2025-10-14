import type { GameState } from '@/structures'
import JourneyItem from '@/pages/Game/Win/JourneyItem.tsx'

interface JourneyProps {
    gameState: GameState
}

const Journey = (props: JourneyProps) => {
    const { gameState } = props

    return (
        <div className="flex flex-row border-2 p-8">
            <div className="flex flex-col gap-y-4">
                <div className="text-xl">Journey</div>
                {gameState.map((playable, index) => (
                    <JourneyItem playable={playable} index={index} isLast={gameState.length - 1 === index} />
                ))}
            </div>
        </div>
    )
}

export default Journey
