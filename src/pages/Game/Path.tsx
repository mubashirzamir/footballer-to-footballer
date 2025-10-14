import PlayerImage from '@/components/PlayerImage.tsx'
import Direction from '@/components/Direction.tsx'
import type { GameState } from '@/structures'

interface PathProps {
    gameState: GameState
}

const Path = (props: PathProps) => {
    const { gameState } = props

    console.error('mushi Path (gameState)', gameState)

    return (
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap space-x-4">
                {gameState.map((_, index) => (
                    <div className="flex items-center space-x-4" key={index}>
                        <div className="size-8">
                            <PlayerImage imageUrl={gameState[index].imageUrl} />
                        </div>
                        {gameState.length - 1 === index && <span>{gameState[index].name}</span>}
                        <Direction className="text-xl" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Path
