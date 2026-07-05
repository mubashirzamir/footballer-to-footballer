import { useEffect, useRef } from 'react'
import type { GameState } from '@/structures'
import { useNavigate } from 'react-router'

// TODO: chop recreates on every render of useGameState, which forces us to either:
//   (a) add it to the popstate effect deps — but this re-registers the listener on every render, breaking things
//   (b) use a useRef to avoid stale closure — but the real fix is making chop stable at the source.
// Investigate why chop can't be stable (wrapped in useCallback or derived from setGameState's functional updater).
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
        // see TODO above
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useGameNavigation
