import WinCard from '@/pages/Game/Win/WinCard.tsx'
import { secondstoHourMinutesSeconds } from '@/utils'

interface TimeCardProps {
    time: number // in seconds
}

const TimeCard = ({ time }: TimeCardProps) => {
    return (
        <WinCard>
            <div className="text-xl">Time</div>
            <div className="text-2xl font-bold">{secondstoHourMinutesSeconds(time)}</div>
        </WinCard>
    )
}

export default TimeCard
