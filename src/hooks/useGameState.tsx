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

    return { gameState, setGameState, append, chop }
}

export default useGameState
