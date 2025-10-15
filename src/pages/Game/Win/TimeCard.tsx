import WinCard from '@/pages/Game/Win/WinCard.tsx'

interface TimeCardProps {
    time: number // in seconds
}

const TimeCard = ({ time }: TimeCardProps) => {
    return (
        <WinCard>
            <div className="text-xl">Time</div>
            <div className="text-2xl font-bold">{time}s</div>
        </WinCard>
    )
}

export default TimeCard
