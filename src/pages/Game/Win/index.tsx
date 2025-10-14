import type { GameState } from '@/structures'
import TimeCard from '@/pages/Game/Win/TimeCard.tsx'
import DistanceCard from '@/pages/Game/Win/DistanceCard.tsx'
import ShortestPossible from '@/pages/Game/Win/ShortestPossible.tsx'
import Journey from '@/pages/Game/Win/Journey.tsx'

interface WinProps {
    gameState: GameState
}

const Win = (props: WinProps) => {
    const { gameState } = props

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <TimeCard />
                    <DistanceCard distance={(gameState.length - 1) / 2} />
                </div>
                <ShortestPossible />
                <Journey gameState={gameState} />
            </div>
        </div>
    )
}

export default Win
