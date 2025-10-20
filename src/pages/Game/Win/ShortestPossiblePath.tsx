import useShortestPossiblePath from '@/services/shortest-path/useShortestPossiblePath.tsx'
import Journey from '@/pages/Game/Win/Journey.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import type { GameInfo, GameState } from '@/structures'
import JourneyCard from '@/pages/Game/Win/JourneyCard.tsx'
import Error from '@/components/Error.tsx'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

interface ShortestPossiblePathProps {
    gameInfo: GameInfo
    gameState: GameState
}

const ShortestPossiblePath = ({ gameInfo, gameState }: ShortestPossiblePathProps) => {
    const { isTodaysGame, isShortest, message, shortestPath, loading, isError, error } = useShortestPossiblePath(
        gameInfo,
        gameState
    )

    // Do not render if not today's game or no game found
    if (!isTodaysGame) return null

    const renderHeader = () => (
        <summary className="flex items-center justify-center text-xl cursor-pointer py-2 text-center min-h-[2.5rem]">
            {__.messages.game.win.shortest_possible}
            <span className="ml-2 text-2xl font-bold">{(shortestPath.length - 1) / 2}</span>
        </summary>
    )

    const renderMessage = () => {
        if (!isShortest) return null
        return <Text className="text-green-500 font-bold text-lg text-center mb-2">{message}</Text>
    }

    return (
        <JourneyCard>
            {isError ? (
                <Error error={error} />
            ) : loading ? (
                <div className="flex justify-center py-6">
                    <BaseSpinner className="size-8" />
                </div>
            ) : (
                <>
                    {renderMessage()}
                    <details className="w-full">
                        {renderHeader()}
                        <Journey gameState={shortestPath} />
                    </details>
                </>
            )}
        </JourneyCard>
    )
}

export default ShortestPossiblePath
