import { useState } from 'react'
import type { GameState } from '@/structures'
import type { Playable } from '@/structures/Playable.ts'

const useGameState = (state: Playable[]) => {
    const [gameState, setGameState] = useState<GameState>(state)

    const append = (playable: Playable) => {
        setGameState((state) => [...state, playable])
    }

    const chop = (index: number) => {
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
