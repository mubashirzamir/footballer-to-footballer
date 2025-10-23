import type { Playable } from '@/structures/Playable.ts'
import PlayableImage from '@/components/PlayableImage.tsx'
import Direction from '@/components/Direction.tsx'
import Text from '@/components/Text.tsx'
import { Team } from '@/structures/Team.ts'

interface PathItemProps {
    playable: Playable
    chopGameState: (index: number) => void
    index: number
    isLast: boolean
}

const PathItem = ({ playable, index, chopGameState, isLast }: PathItemProps) => {
    const handleClick = () => {
        if (isLast) return

        chopGameState(index)
    }

    const renderSeason = () => {
        if (playable instanceof Team) {
            return playable.getCompactSeasonRange()
        }
    }

    return (
        <div className="flex items-center cursor-pointer hover:bg-muted" onClick={handleClick}>
            <div className="w-8 h-8 mr-2">
                <PlayableImage imageUrl={playable.imageUrl} />
            </div>
            {isLast && (
                <Text className="mr-2">
                    {playable.name} {renderSeason()}
                </Text>
            )}
            <Direction className="mr-2" />
        </div>
    )
}

export default PathItem
