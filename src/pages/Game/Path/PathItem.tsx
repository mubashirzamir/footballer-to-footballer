import type { Playable } from '@/structures/Playable.ts'
import PlayableImage from '@/components/PlayableImage.tsx'
import Direction from '@/components/Direction.tsx'
import Text from '@/components/Text.tsx'

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
        if (playable.entityType === 'team') {
            // TODO: TypeScript should be able to infer this but not doing so for some reason?
            // @ts-ignore
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
