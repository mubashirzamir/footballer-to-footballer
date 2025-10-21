import { useContext } from 'react'
import { GameStateContext, type GameStateContextValue } from '@/contexts-providers/game-state/GameStateContext.tsx'

export const useGameContext = (): GameStateContextValue => {
    const ctx = useContext(GameStateContext)
    if (!ctx) {
        throw new Error('useGameStateContext must be used within GameStateContextProvider')
    }
    return ctx
}
