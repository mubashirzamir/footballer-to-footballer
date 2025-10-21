import { type ReactNode, useMemo } from 'react'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'
import useGameState from '@/hooks/useGameState.tsx'
import useGameTimer from '@/hooks/useGameTimer.tsx'
import useGameNavigation from '@/hooks/useGameNavigation.tsx'
import { GameContext } from '@/contexts-providers/GameContext.tsx'

interface GameContextProviderProps {
    children: ReactNode
}

const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const { gameInfo, infoHealth } = useGameInfoFromLocation()
    const { gameState, setGameState, tail, gameOver, append, chop } = useGameState([gameInfo.startPlayer], gameInfo)
    const { time, timeTaken, buzzer } = useGameTimer()

    useGameNavigation(gameState, chop)

    const value = useMemo(
        () => ({
            gameInfoContainer: { gameInfo, infoHealth },
            gameStateContainer: { gameState, setGameState, tail, gameOver, append, chop },
            gameTimerContainer: { time, timeTaken, buzzer },
        }),
        [gameInfo, infoHealth, gameState, setGameState, tail, gameOver, append, chop, time, timeTaken, buzzer]
    )

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContextProvider
