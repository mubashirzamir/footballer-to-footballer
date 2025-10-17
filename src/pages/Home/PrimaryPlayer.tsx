import PlayableImage from '@/components/PlayableImage.tsx'
import { Player } from '@/structures/Player.ts'
import Text from '@/components/Text.tsx'

interface PrimaryPlayerProps {
    player: Player
}

const PrimaryPlayer = (props: PrimaryPlayerProps) => {
    const { player } = props

    return (
        <div>
            <div className="md:size-80 sm:size-64 size-24">
                <PlayableImage imageUrl={player.imageUrl} />
            </div>
            <Text text={player.name} className="md:text-xl sm:text-xl font-bold mt-4 md:max-w-[20rem] sm:max-w-[16rem] max-w-[6rem]" />
        </div>
    )
}

export default PrimaryPlayer
