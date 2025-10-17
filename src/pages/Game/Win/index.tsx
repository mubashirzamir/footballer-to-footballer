import type { GameState } from '@/structures'
import TimeCard from '@/pages/Game/Win/TimeCard.tsx'
import DistanceCard from '@/pages/Game/Win/DistanceCard.tsx'
import ShortestPossiblePath from '@/pages/Game/Win/ShortestPossiblePath.tsx'
import Journey from '@/pages/Game/Win/Journey.tsx'
import JourneyCard from '@/pages/Game/Win/JourneyCard.tsx'
import { ENV_IS_DEV } from '@/utils/constants.ts'
import Text from '@/components/Text.tsx'

interface WinProps {
    gameState: GameState
    timeTaken: number // in seconds
}

const Win = (props: WinProps) => {
    const { gameState, timeTaken } = props

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <TimeCard time={timeTaken} />
                    <DistanceCard distance={(gameState.length - 1) / 2} />
                </div>
                {!ENV_IS_DEV && (
                    <JourneyCard>
                        <ShortestPossiblePath gameState={gameState} />
                    </JourneyCard>
                )}
                <JourneyCard>
                    <Text className="text-xl mb-4 text-center font-bold">Journey</Text>
                    <Journey gameState={gameState} />
                </JourneyCard>
            </div>
        </div>
    )
}

export default Win
