import { createContext } from 'react'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'

export interface GameInfoContextValue {
    gameInfo: ReturnType<typeof useGameInfoFromLocation>['gameInfo']
    infoHealth: ReturnType<typeof useGameInfoFromLocation>['infoHealth']
}

export const GameInfoContext = createContext<GameInfoContextValue | undefined>(undefined)
