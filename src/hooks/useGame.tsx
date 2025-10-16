import type { GameInfo, InfoHealth } from '@/structures'
import { useEffect, useState } from 'react'
import useServiceProfile from '@/service-hooks/player/useServiceProfile.ts'

const useGame = (gameInfo: GameInfo) => {
    if (gameInfo.startPlayer.id === gameInfo.endPlayer.id) {
        throw new Error('Start and end player IDs cannot be the same')
    }

    const [info, setInfo] = useState<GameInfo>(gameInfo)

    // use service hooks for both players
    const {
        playerHydrated: startPlayerHydrated,
        loading: loadingSP,
        isError: isErrorSP,
        error: errorSP,
    } = useServiceProfile(info.startPlayer)

    const {
        playerHydrated: endPlayerHydrated,
        loading: loadingEP,
        isError: isErrorEP,
        error: errorEP,
    } = useServiceProfile(info.endPlayer)

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
