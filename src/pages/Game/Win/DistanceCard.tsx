import WinCard from '@/pages/Game/Win/WinCard.tsx'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

interface DistanceCardProps {
    distance: number
}

const DistanceCard = ({ distance }: DistanceCardProps) => {
    return (
        <WinCard>
            <Text className="text-xl font-bold">{__.messages.game.win.distance}</Text>
            <Text className="text-2xl">{distance}</Text>
        </WinCard>
    )
}

export default DistanceCard
