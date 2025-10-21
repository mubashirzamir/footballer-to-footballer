import { createContext } from 'react'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'
import useGameState from '@/hooks/useGameState.tsx'
import useGameTimer from '@/hooks/useGameTimer.tsx'
import type { Playable } from '@/structures/Playable.ts'

export interface GameContextValue {
    gameInfoContainer: {
        gameInfo: ReturnType<typeof useGameInfoFromLocation>['gameInfo']
        infoHealth: ReturnType<typeof useGameInfoFromLocation>['infoHealth']
    }
    gameStateContainer: {
        gameState: Playable[]
        setGameState: ReturnType<typeof useGameState>['setGameState']
        tail: Playable
        gameOver: boolean
        append: ReturnType<typeof useGameState>['append']
        chop: ReturnType<typeof useGameState>['chop']
    }
    gameTimerContainer: {
        time: ReturnType<typeof useGameTimer>['time']
        timeTaken: ReturnType<typeof useGameTimer>['timeTaken']
        buzzer: ReturnType<typeof useGameTimer>['buzzer']
    }
}

export const GameContext = createContext<GameContextValue | undefined>(undefined)
