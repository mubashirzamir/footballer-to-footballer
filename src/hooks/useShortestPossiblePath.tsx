import type { GameState } from '@/structures'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import { mockGameState } from '@/utils/mock.ts'

const useShortestPossiblePath = (gameState: GameState) => {
    const [shortestPossiblePath, setShortestPossiblePath] = useState<GameState>([])
    const [foundNewShortestPath, setFoundNewShortestPath] = useState(false)
    const [loading, setLoading] = useState(false)
    const length = (shortestPossiblePath.length - 1) / 2

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            if (gameState.length < shortestPossiblePath.length) {
                setTimeout(() => {
                    setShortestPossiblePath(gameState)
                    setFoundNewShortestPath(true)
                }, DELAY)
            } else {
                setShortestPossiblePath(mockGameState)
            }

            setLoading(false)
        }, DELAY)
    }, [])

    return { shortestPossiblePath, length, foundNewShortestPath, loading }
}

export default useShortestPossiblePath
