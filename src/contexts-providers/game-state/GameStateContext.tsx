import { createContext } from 'react'
import useGameState from '@/hooks/useGameState.tsx'
import type { Playable } from '@/structures/Playable.ts'

export interface GameStateContextValue {
    gameState: Playable[]
    setGameState: ReturnType<typeof useGameState>['setGameState']
    tail: Playable
    gameOver: boolean
    append: ReturnType<typeof useGameState>['append']
    chop: ReturnType<typeof useGameState>['chop']
}

export const GameStateContext = createContext<GameStateContextValue | undefined>(undefined)
