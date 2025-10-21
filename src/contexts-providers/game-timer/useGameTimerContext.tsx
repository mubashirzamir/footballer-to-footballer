import { useContext } from 'react'
import { GameInfoContext, type GameContextValue } from '@/contexts-providers/GameInfoContext.tsx'

export const useGameContext = (): GameContextValue => {
    const ctx = useContext(GameInfoContext)
    if (!ctx) {
        throw new Error('useGameContext must be used within GameProvider')
    }
    return ctx
}
