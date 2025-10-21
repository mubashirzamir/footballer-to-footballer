import { useCallback, useEffect, useState } from 'react'

const useGameTimer = () => {
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

    return { time, timeTaken, buzzer }
}

export default useGameTimer
