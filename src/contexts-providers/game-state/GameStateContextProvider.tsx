import { type ReactNode, useMemo } from 'react'
import useGameState from '@/hooks/useGameState.tsx'
import useGameNavigation from '@/hooks/useGameNavigation.tsx'
import { GameStateContext } from '@/contexts-providers/game-state/GameStateContext.tsx'
import { useGameInfoContext } from '@/contexts-providers/game-info/useGameInfoContext.tsx'

interface GameContextProviderProps {
    children: ReactNode
}

const GameStateContextProvider = ({ children }: GameContextProviderProps) => {
    const { gameInfo } = useGameInfoContext()
    const { gameState, setGameState, tail, gameOver, append, chop } = useGameState([gameInfo.startPlayer], gameInfo)

    useGameNavigation(gameState, chop)

    const value = useMemo(
        () => ({
            gameState,
            setGameState,
            tail,
            gameOver,
            append,
            chop,
        }),
        [append, chop, gameOver, gameState, setGameState, tail]
    )

    return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>
}

export default GameStateContextProvider
