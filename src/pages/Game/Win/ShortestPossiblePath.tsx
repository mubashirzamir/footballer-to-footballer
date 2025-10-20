import useShortestPossiblePath from '@/services/shortest-path/useShortestPossiblePath.tsx'
import Journey from '@/pages/Game/Win/Journey.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import type { GameInfo, GameState } from '@/structures'
import JourneyCard from '@/pages/Game/Win/JourneyCard.tsx'
import Error from '@/components/Error.tsx'
import Text from '@/components/Text.tsx'

interface ShortestPossiblePathProps {
    gameInfo: GameInfo
    gameState: GameState
}

// TODO: ew
const ShortestPossiblePath = ({ gameInfo, gameState }: ShortestPossiblePathProps) => {
    const { isTodaysGame, foundGame, isShortest, message, shortestPath, loading, isError, error } =
        useShortestPossiblePath(gameInfo, gameState)

    // Do not render if not today's game or no game found
    if (!isTodaysGame || !foundGame) return

    return (
        <JourneyCard>
            {/* Error message if any error occurred */}
            {isError ? (
                <Error error={error} />
            ) : (
                <>
                    {/* Success message if shortest path found */}
                    {isShortest && <Text className="text-green-500 font-bold text-lg text-center mb-2">{message}</Text>}
                    <details className="w-full">
                        <summary className="flex items-center justify-center text-xl cursor-pointer py-2 text-center min-h-[2.5rem]">
                            → Shortest possible:
                            <span className="ml-2">
                                {loading ? (
                                    <BaseSpinner className="size-4 inline-block" />
                                ) : (
                                    <span className="text-2xl font-bold">{(shortestPath.length - 1) / 2}</span>
                                )}
                            </span>
                        </summary>

                        {/* Show journey only if data is loaded and no error */}
                        {!loading && <Journey gameState={shortestPath} />}
                    </details>
                </>
            )}
        </JourneyCard>
    )
}

export default ShortestPossiblePath
