import { createContext } from 'react'
import useGameTimer from '@/hooks/useGameTimer.tsx'

export interface GameTimerContextValue {
    time: ReturnType<typeof useGameTimer>['time']
    timeTaken: ReturnType<typeof useGameTimer>['timeTaken']
    buzzer: ReturnType<typeof useGameTimer>['buzzer']
}

export const GameTimerContext = createContext<GameTimerContextValue | undefined>(undefined)
