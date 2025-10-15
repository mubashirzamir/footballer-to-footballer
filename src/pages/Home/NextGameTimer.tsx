import useNextGameTimer from '@/hooks/useNextGameTimer.tsx'

const NextGameTimer = () => {
    const time = useNextGameTimer()

    return <div>Next Challenge: {time}</div>
}

export default NextGameTimer
