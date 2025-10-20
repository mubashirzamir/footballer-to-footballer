import { useEffect, useRef } from 'react'
import type { GameState } from '@/structures'
import { useLocation, useNavigate } from 'react-router'

const useGameNavigation = (gameState: GameState, chop: (index: number) => void) => {
    const navigate = useNavigate()
    const prevLength = useRef(gameState.length)
    const chopRef = useRef(chop)
    const location = useLocation()
    const hash = Number(location.hash.replace('#', ''))

    useEffect(() => {
        chopRef.current = chop
    }, [chop])

    useEffect(() => {
        if (gameState.length > prevLength.current) {
            navigate(`#${gameState.length - 1}`, { replace: false })
        }

        prevLength.current = gameState.length
    }, [gameState.length, navigate])

    // Adding hash to the dependency array breaks the feature. Not sure why.
    useEffect(() => {
        const handlePopState = () => {
            chopRef.current(hash || 0)
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])
}

export default useGameNavigation
