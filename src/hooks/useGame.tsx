import type { GameInfo, InfoHealth } from '@/structures'
import { useEffect, useState } from 'react'
import useServicePlayerProfile from '@/services/useServicePlayerProfile.tsx'

const useGame = (gameInfo: GameInfo) => {
    const [info, setInfo] = useState<GameInfo>(gameInfo)

    useEffect(() => {
        setInfo(gameInfo)
    }, [gameInfo.startPlayer.id, gameInfo.endPlayer.id])

    // use service hooks for both players
    const {
        player: startPlayerHydrated,
        loading: loadingSP,
        isError: isErrorSP,
        error: errorSP,
    } = useServicePlayerProfile(info.startPlayer)

    const {
        player: endPlayerHydrated,
        loading: loadingEP,
        isError: isErrorEP,
        error: errorEP,
    } = useServicePlayerProfile(info.endPlayer)

    // track health state
    const infoHealth: InfoHealth = {
        startPlayer: { loading: loadingSP, isError: isErrorSP, error: errorSP },
        endPlayer: { loading: loadingEP, isError: isErrorEP, error: errorEP },
    }

    // update hydrated info when profiles load
    useEffect(() => {
        if (startPlayerHydrated || endPlayerHydrated) {
            setInfo((prev) => ({
                ...prev,
                startPlayer: startPlayerHydrated ?? prev.startPlayer,
                endPlayer: endPlayerHydrated ?? prev.endPlayer,
            }))
        }
    }, [startPlayerHydrated, endPlayerHydrated])

    return { gameInfo: info, infoHealth }
}

export default useGame
