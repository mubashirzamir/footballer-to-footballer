import { useState, useCallback } from 'react'
import type { GameInfo, GameState } from '@/structures'
import type { Playable } from '@/structures/Playable.ts'

const useGameState = (initialState: Playable[], gameInfo: GameInfo) => {
    const [gameState, setGameState] = useState<GameState>(initialState)

    const tail = gameState[gameState.length - 1]
    const gameOver = tail.id === gameInfo.endPlayer.id

    const append = useCallback((playable: Playable) => {
        setGameState((state) => [...state, playable])
    }, [])

    const chop = useCallback((index: number) => {
        setGameState((state) => state.slice(0, index + 1))
    }, [])

    return { gameState, setGameState, append, chop, tail, gameOver }
}

export default useGameState
