import { games } from '@/utils/db.tsx'
import { useEffect, useState } from 'react'
import type { GameDriver, GameInfo, InfoHealth } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { Logger } from '@/utils'
import useServiceProfile from '@/service-hooks/player/useServiceProfile.ts'

export const useGameInfoFromDb = (): GameDriver => {
    const [info, setInfo] = useState<GameInfo>(getGameInfo())

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

const getGameInfo = (): GameInfo => {
    const date = new Date().toISOString().split('T')[0]
    let info = {
        startPlayer: Player.instance('unknown').setName('Unknown').setImageUrl('/ball.svg'),
        endPlayer: Player.instance('unknown').setName('Unknown').setImageUrl('/ball.svg'),
    }

    try {
        info = {
            startPlayer: Player.instance(games[date].start_player_id)
                .setName(games[date].start_player_name)
                .setImageUrl('/ball.svg'),
            endPlayer: Player.instance(games[date].end_player_id)
                .setName(games[date].end_player_name)
                .setImageUrl('/ball.svg'),
        }
    } catch (e: unknown) {
        Logger.log(e)
    }

    return info
}

export default useGameInfoFromDb
