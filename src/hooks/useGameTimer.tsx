import { useEffect, useState } from 'react'

const useGameTimer = () => {
    const [time, setTime] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const [running, setRunning] = useState(true)

    useEffect(() => {
        if (!running) return // stop if not running

        const interval = setInterval(() => {
            setTime((t) => t + 1)
        }, 1000)

        return () => clearInterval(interval) // cleanup
    }, [running]) // re-run when running changes

    const buzzer = () => {
        setTimeTaken(time) // capture
        setRunning(false) // stop
    }

    return { time, timeTaken, buzzer }
}

export default useGameTimer
