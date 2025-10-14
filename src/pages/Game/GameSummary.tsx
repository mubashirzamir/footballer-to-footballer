import Direction from '@/components/Direction.tsx'
import PlayerImage from '@/components/PlayerImage.tsx'

const GameSummary = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center space-x-8">
                <div className="size-24"><PlayerImage /></div>
                <Direction />
                <div className="size-24"><PlayerImage /></div>
            </div>
        </div>
    )
}

export default GameSummary
