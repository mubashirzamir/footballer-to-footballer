import Text from '@/components/Text.tsx'
import { useGameContext } from '@/hooks/useGameContext.tsx'

const Timer = () => {
    const { gameTimerContainer } = useGameContext()

    return <Text className="text-sm">{gameTimerContainer.time}</Text>
}

export default Timer
