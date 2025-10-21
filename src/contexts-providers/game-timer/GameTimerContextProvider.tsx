import { type ReactNode, useMemo } from 'react'
import useGameTimer from '@/hooks/useGameTimer.tsx'
import { GameTimerContext } from '@/contexts-providers/game-timer/GameTimerContext.tsx'

interface GameContextProviderProps {
    children: ReactNode
}

const GameTimerContextProvider = ({ children }: GameContextProviderProps) => {
    const { time, timeTaken, buzzer } = useGameTimer()

    const value = useMemo(
        () => ({
            time,
            timeTaken,
            buzzer,
        }),
        [buzzer, time, timeTaken]
    )

    return <GameTimerContext.Provider value={value}>{children}</GameTimerContext.Provider>
}

export default GameTimerContextProvider
