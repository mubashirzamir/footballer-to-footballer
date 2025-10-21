import Text from '@/components/Text.tsx'
import { useGameTimerContext } from '@/contexts-providers/game-timer/useGameTimerContext.tsx'

const Timer = () => {
    const { time } = useGameTimerContext()

    return <Text className="text-sm">{time}</Text>
}

export default Timer
