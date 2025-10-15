import PlayableImage from '@/components/PlayableImage.tsx'
import Direction from '@/components/Direction.tsx'
import type { Playable } from '@/structures/Playable.ts'

interface JourneyItemProps {
    playable: Playable
    index: number
    isLast: boolean
}

const JourneyItem = (props: JourneyItemProps) => {
    const { playable, index, isLast } = props

    const isTeam = playable.type === 'team'

    return (
        <div className="flex flex-col items-start space-x-4" key={playable.id}>
            <div className="flex flex-row items-center space-x-4">
                {isTeam && <div className="text-lg">{(index + 1) / 2}</div>}
                <div className={`size-16`}>
                    <PlayableImage imageUrl={playable.imageUrl} />
                </div>
                <span className="text-lg">{playable.name}</span>
            </div>

            {!isLast && (
                <div>
                    <div className="rotate-90">
                        <Direction className="text-xl" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default JourneyItem
