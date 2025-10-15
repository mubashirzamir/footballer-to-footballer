import { useEffect, useRef } from 'react'
import type { GameState } from '@/structures'
import { useNavigate } from 'react-router'

// Unnecessary complexity.
// Works fine stand alone, but when game state is changed from path, we cannot keep browser history in sync.
// useGameNavigation(gameState, pop)
const useGameNavigation = (gameState: GameState, pop: () => void) => {
    const navigate = useNavigate()
    const prevLength = useRef(gameState.length)

    useEffect(() => {
        if (gameState.length > prevLength.current) {
            navigate(`#${gameState.length - 1}`, { replace: false })
        }

        prevLength.current = gameState.length
    }, [gameState, navigate])

    // Adding pop to the dependency array breaks the feature. Not sure why.
    useEffect(() => {
        const handlePopState = () => {
            pop()
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])
}

export default useGameNavigation
