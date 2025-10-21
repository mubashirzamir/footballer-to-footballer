import GameInfoContextProvider from '@/contexts-providers/game-info/GameInfoContextProvider.tsx'
import GameStateContextProvider from '@/contexts-providers/game-state/GameStateContextProvider.tsx'
import GameTimerContextProvider from '@/contexts-providers/game-timer/GameTimerContextProvider.tsx'
import type { ReactNode } from 'react'

const ContextsProviders = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <GameInfoContextProvider>
                <GameStateContextProvider>
                    <GameTimerContextProvider>{children}</GameTimerContextProvider>
                </GameStateContextProvider>
            </GameInfoContextProvider>
        </>
    )
}

export default ContextsProviders
