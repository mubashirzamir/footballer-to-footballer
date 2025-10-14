import WinCard from '@/pages/Game/Win/WinCard.tsx'

interface DistanceCardProps {
    distance: number
}

const DistanceCard = ({distance}: DistanceCardProps) => {
    return (
        <WinCard>
            <div className="text-xl">Distance</div>
            <div className="text-2xl font-bold">{distance}</div>
        </WinCard>
    )
}

export default DistanceCard