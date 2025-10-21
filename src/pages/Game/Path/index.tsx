import PathItem from './PathItem.tsx'
import { useNavigate } from 'react-router'
import { useGameStateContext } from '@/contexts-providers/game-state/useGameStateContext.tsx'

const Path = () => {
    const { gameState } = useGameStateContext()

    const navigate = useNavigate()

    const onClick = (index: number) => {
        navigate(-(gameState.length - 1 - index))
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap gap-y-2">
                {gameState.map((playable, index) => (
                    <PathItem
                        key={`${playable.id}_${index}`}
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
