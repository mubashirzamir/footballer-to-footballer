import WinCard from '@/pages/Game/Win/WinCard.tsx'
import { secondstoHourMinutesSeconds } from '@/utils'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

interface TimeCardProps {
    time: number // in seconds
}

const TimeCard = ({ time }: TimeCardProps) => {
    return (
        <WinCard>
            <Text className="text-xl font-bold">{__.messages.time}</Text>
            <Text className="text-2xl">{secondstoHourMinutesSeconds(time)}</Text>
        </WinCard>
    )
}

export default TimeCard
