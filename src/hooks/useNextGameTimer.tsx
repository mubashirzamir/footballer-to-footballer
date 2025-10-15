import { useEffect, useState } from 'react'

const useNextGameTimer = () => {
    const [time, setTime] = useState(getTimeUntilMidnight)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeUntilMidnight())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return time
}

const getTimeUntilMidnight = () => {
    const now = new Date()
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const diff: number = midnight.getTime() - now.getTime() // milliseconds until midnight

    const hours = Math.floor(diff / 1000 / 60 / 60)
    const minutes = Math.floor((diff / 1000 / 60) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default useNextGameTimer
