import type { Playable } from '@/structures/Playable.ts'
import PlayableImage from '@/components/PlayableImage.tsx'
import Direction from '@/components/Direction.tsx'

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

    return (
        <div className="flex items-center space-x-4 cursor-pointer" key={playable.id} onClick={handleClick}>
            <div className="size-8">
                <PlayableImage imageUrl={playable.imageUrl} />
            </div>
            {isLast && <span>{playable.name}</span>}
            <Direction className="text-xl" />
        </div>
    )
}

export default PathItem
