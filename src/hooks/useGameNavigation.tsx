import { useEffect, useRef } from 'react'
import type { GameState } from '@/structures'
import { useNavigate } from 'react-router'

const useGameNavigation = (gameState: GameState, chop: (index: number) => void) => {
    const navigate = useNavigate()
    const prevLength = useRef(gameState.length)

    useEffect(() => {
        if (gameState.length > prevLength.current) {
            navigate(`#${gameState.length - 1}`, { replace: false })
        }

        prevLength.current = gameState.length
    }, [gameState.length, navigate])

    // Adding hash to the dependency array breaks the feature. Not sure why.
    useEffect(() => {
        const handlePopState = () => {
            const idx = Number(window.location.hash.replace('#', '')) || 0
            chop(idx)
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [navigate, chop])
}

export default useGameNavigation
