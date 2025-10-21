import { useContext } from 'react'
import { GameTimerContext, type GameTimerContextValue } from '@/contexts-providers/game-timer/GameTimerContext.tsx'

export const useGameTimerContext = (): GameTimerContextValue => {
    const ctx = useContext(GameTimerContext)
    if (!ctx) {
        throw new Error('useGameContext must be used within GameProvider')
    }
    return ctx
}
