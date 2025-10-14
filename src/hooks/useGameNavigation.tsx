import * as React from 'react'
import { useEffect, useRef } from 'react'
import type { GameState } from '@/structures'
import { useNavigate } from 'react-router'

// TODO: Recheck
const useGameNavigation = (gameState: GameState, setGameState: React.Dispatch<React.SetStateAction<GameState>>) => {
    const navigate = useNavigate()
    const prevLength = useRef(gameState.length)

    useEffect(() => {
        if (gameState.length > prevLength.current) {
            navigate(`#${gameState.length - 1}`, { replace: false })
        }

        prevLength.current = gameState.length
    }, [gameState, navigate])

    useEffect(() => {
        const handlePopState = () => {
            setGameState((state: GameState) => {
                if (state.length > 1) {
                    return state.slice(0, -1)
                }

                return state
            })
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [setGameState])
}

export default useGameNavigation
