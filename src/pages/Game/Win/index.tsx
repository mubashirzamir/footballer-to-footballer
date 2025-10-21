import TimeCard from '@/pages/Game/Win/TimeCard.tsx'
import DistanceCard from '@/pages/Game/Win/DistanceCard.tsx'
import ShortestPossiblePath from '@/pages/Game/Win/ShortestPossiblePath.tsx'
import Journey from '@/pages/Game/Win/Journey.tsx'
import JourneyCard from '@/pages/Game/Win/JourneyCard.tsx'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'
import { useGameContext } from '@/hooks/useGameContext.tsx'

const Win = () => {
    const { gameTimerContainer, gameInfoContainer, gameStateContainer } = useGameContext()
    const { timeTaken } = gameTimerContainer
    const { gameInfo } = gameInfoContainer
    const { gameState } = gameStateContainer

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <TimeCard time={timeTaken} />
                    <DistanceCard distance={(gameState.length - 1) / 2} />
                </div>
                <ShortestPossiblePath gameInfo={gameInfo} gameState={gameState} />
                <JourneyCard>
                    <Text className="text-xl mb-4 text-center font-bold">{__.messages.game.win.journey}</Text>
                    <Journey gameState={gameState} />
                </JourneyCard>
            </div>
        </div>
    )
}

export default Win
