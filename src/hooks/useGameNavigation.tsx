import { useEffect, useRef } from 'react'
import type { GameState } from '@/structures'
import { useNavigate } from 'react-router'

// TODO: Recheck
const useGameNavigation = (gameState: GameState, pop: () => void) => {
    const navigate = useNavigate()
    const prevLength = useRef(gameState.length)

    useEffect(() => {
        if (gameState.length > prevLength.current) {
            navigate(`#${gameState.length - 1}`, { replace: false })
        }

        prevLength.current = gameState.length
    }, [gameState, navigate])

    // TODO: Adding pop to the dependency array breaks the feature. Investigate why?
    useEffect(() => {
        const handlePopState = () => {
            pop()
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])
}

export default useGameNavigation
