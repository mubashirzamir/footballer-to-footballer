import { useContext } from 'react'
import { GameInfoContext, type GameInfoContextValue } from '@/contexts-providers/game-info/GameInfoContext.tsx'

export const useGameInfoContext = (): GameInfoContextValue => {
    const ctx = useContext(GameInfoContext)
    if (!ctx) {
        throw new Error('useGameInfoContext must be used within GameInfoContextProvider')
    }
    return ctx
}
