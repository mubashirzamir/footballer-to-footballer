import type { GameState } from '@/structures'
import PathItem from './PathItem.tsx'
import { useNavigate } from 'react-router'

interface PathProps {
    gameState: GameState
}

const Path = (props: PathProps) => {
    const { gameState } = props

    const navigate = useNavigate()

    const onClick = (index: number) => {
        navigate(-(gameState.length - 1 - index))
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap gap-y-2">
                {gameState.map((playable, index) => (
                    <PathItem
                        key={`path-item-${playable.id}-${index}`}
                        playable={playable}
                        index={index}
                        chopGameState={onClick}
                        isLast={gameState.length - 1 === index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Path
