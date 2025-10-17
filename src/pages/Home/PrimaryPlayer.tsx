import PlayableImage from '@/components/PlayableImage.tsx'
import { Player } from '@/structures/Player.ts'
import Text from '@/components/Text.tsx'

interface PrimaryPlayerProps {
    player: Player
}

const PrimaryPlayer = (props: PrimaryPlayerProps) => {
    const { player } = props

    return (
        <div className="flex flex-col items-center">
            <div className="md:w-80 md:h-80 sm:w-64 sm:h-64 w-24 h-24">
                <PlayableImage imageUrl={player.imageUrl} />
            </div>
            <Text
                text={player.name}
                className="md:text-xl sm:text-xl font-bold mt-4 min-h-[3rem] md:w-[10rem] sm:w-[16rem] w-[10rem]"
            />
        </div>
    )
}

export default PrimaryPlayer
