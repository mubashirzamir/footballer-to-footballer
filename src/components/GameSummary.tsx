import PrimaryPlayer from '@/components/PrimaryPlayer.tsx'
import Direction from '@/components/Direction.tsx'

const GameSummary = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center space-x-8">
                <PrimaryPlayer />
                <Direction />
                <PrimaryPlayer />
            </div>
        </div>
    )
}

export default GameSummary
