import PlayableImage from '@/components/PlayableImage.tsx'
import Direction from '@/components/Direction.tsx'
import type { Playable } from '@/structures/Playable.ts'
import Text from '@/components/Text.tsx'

interface JourneyItemProps {
    playable: Playable
    index: number
    isLast: boolean
}

const JourneyItem = (props: JourneyItemProps) => {
    const { playable, index, isLast } = props

    const isTeam = playable.entityType === 'team'

    return (
        <div className="flex flex-col items-start" key={playable.id}>
            <div className="flex flex-row items-center">
                {isTeam && <Text className="mr-4 font-bold">{(index + 1) / 2}</Text>}
                <div className="w-16 h-16">
                    <PlayableImage imageUrl={playable.imageUrl} />
                </div>
                <Text className="text-lg">{playable.name}</Text>
            </div>

            {!isLast && (
                <div>
                    <div className="w-16 h-16 flex text-center items-center justify-center rotate-90 ">
                        <Direction className="text-xl" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default JourneyItem
