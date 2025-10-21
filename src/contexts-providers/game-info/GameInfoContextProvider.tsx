import { type ReactNode, useMemo } from 'react'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'
import { GameInfoContext } from '@/contexts-providers/game-info/GameInfoContext.tsx'

interface GameContextProviderProps {
    children: ReactNode
}

const GameInfoContextProvider = ({ children }: GameContextProviderProps) => {
    const { gameInfo, infoHealth } = useGameInfoFromLocation()

    const value = useMemo(
        () => ({
            gameInfo,
            infoHealth,
        }),
        [gameInfo, infoHealth]
    )

    return <GameInfoContext.Provider value={value}>{children}</GameInfoContext.Provider>
}

export default GameInfoContextProvider
