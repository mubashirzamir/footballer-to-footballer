import WinCard from '@/pages/Game/Win/WinCard.tsx'
import useShortestPossiblePath from '@/hooks/useShortestPossiblePath.tsx'
import Journey from '@/pages/Game/Win/Journey.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import type { GameState } from '@/structures'

interface ShortestPossiblePathProps {
    gameState: GameState
}

const ShortestPossiblePath = ({ gameState }: ShortestPossiblePathProps) => {
    const { shortestPossiblePath, foundNewShortestPath, length, loading } = useShortestPossiblePath(gameState)

    return (
        <WinCard>
            {foundNewShortestPath && (
                <div className="text-green-500 font-bold text-lg text-center mb-2">
                    You have found the new shortest path!
                </div>
            )}
            <details className="w-full">
                <summary className="flex items-center justify-center text-xl cursor-pointer py-2 text-center min-h-[2.5rem]">
                    → Shortest possible:
                    <span className="ml-2">{loading ? <BaseSpinner className="size-4 inline-block" /> : length}</span>
                </summary>
                {!loading && <Journey gameState={shortestPossiblePath} />}
            </details>
        </WinCard>
    )
}

export default ShortestPossiblePath
