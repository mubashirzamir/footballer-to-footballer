import type { GameState } from '@/pages/Game/index.tsx'
import PlayerImage from '@/components/PlayerImage.tsx'
import Direction from '@/components/Direction.tsx'

interface PathProps {
    gameState: GameState
}

const Path = (props: PathProps) => {
    const { gameState } = props

    console.log(gameState)

    return (
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap space-x-4">
                {gameState.map((_, index) => (
                    <div className="flex items-center space-x-4" key={index}>
                        <div className="size-8">
                            <PlayerImage />
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
