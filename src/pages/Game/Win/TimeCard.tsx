import WinCard from '@/pages/Game/Win/WinCard.tsx'
import { secondstoHourMinutesSeconds } from '@/utils'
import Text from '@/components/Text.tsx'

interface TimeCardProps {
    time: number // in seconds
}

const TimeCard = ({ time }: TimeCardProps) => {
    return (
        <WinCard>
            <Text className="text-xl font-bold">Time</Text>
            <Text className="text-2xl">{secondstoHourMinutesSeconds(time)}</Text>
        </WinCard>
    )
}

export default TimeCard
