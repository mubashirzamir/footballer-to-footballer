import type { GameState } from '@/structures'
import PathItem from './PathItem.tsx'

interface PathProps {
    gameState: GameState
    chopGameState: (index: number) => void
}

const Path = (props: PathProps) => {
    const { gameState, chopGameState } = props

    return (
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap space-x-4">
                {gameState.map((playable, index) => (
                    <PathItem
                        playable={playable}
                        index={index}
                        chopGameState={chopGameState}
                        isLast={gameState.length - 1 === index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Path
