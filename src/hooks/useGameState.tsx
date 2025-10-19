import { useState } from 'react'
import type { GameState } from '@/structures'
import type { Playable } from '@/structures/Playable.ts'
import { useNavigate } from 'react-router'

const useGameState = (state: Playable[]) => {
    const [gameState, setGameState] = useState<GameState>(state)
    const navigate = useNavigate()

    const append = (playable: Playable) => {
        setGameState((state) => [...state, playable])
    }

    const chop = (index: number) => {
        navigate(-(gameState.length - (index + 1)))
        setGameState((state) => state.slice(0, index + 1))
    }

    const pop = () => {
        setGameState((state) => {
            if (state.length > 1) {
                return state.slice(0, -1)
            }

            return state
        })
    }

    return { gameState, setGameState, append, pop, chop }
}

export default useGameState
