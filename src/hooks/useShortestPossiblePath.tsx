import type { GameState } from '@/structures'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import { GAME_STATE } from '@/services/mock/mock.ts'

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
                setShortestPossiblePath(GAME_STATE())
            }

            setLoading(false)
        }, DELAY)
    }, [])

    return { shortestPossiblePath, length, foundNewShortestPath, loading }
}

export default useShortestPossiblePath
