import { useCallback, useEffect, useState } from 'react'
import { useGameStateContext } from '@/contexts-providers/game-state/useGameStateContext.tsx'

const useGameTimer = () => {
    const { gameOver } = useGameStateContext()
    const [time, setTime] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const [isRunning, setIsRunning] = useState(true)

    useEffect(() => {
        if (!isRunning) return // stop if not running

        const interval = setInterval(() => {
            setTime((t) => t + 1)
        }, 1000)

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning]) // re-run when running changes

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const reset = useCallback(() => {
        setTime(0)
        setTimeTaken(0)
        setIsRunning(true)
    }, [])

    const buzzer = useCallback(() => {
        setTimeTaken(time) // capture
        setIsRunning(false)
    }, [time])

    // TODO: Is this the best place to do this?
    // When the game direction is reversed, gameState still holds the first player while gameInfo has the new end player.
    // Since they will be the same we hit the game over condition, so we need to reset the timer.
    if (gameOver && timeTaken === 0) buzzer()

    return { time, timeTaken, buzzer }
}

export default useGameTimer
