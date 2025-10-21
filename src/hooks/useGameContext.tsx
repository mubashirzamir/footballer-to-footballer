import { useContext } from 'react'
import { GameContext, type GameContextValue } from '@/contexts-providers/GameContext.tsx'

export const useGameContext = (): GameContextValue => {
    const ctx = useContext(GameContext)
    if (!ctx) {
        throw new Error('useGameContext must be used within GameProvider')
    }
    return ctx
}
