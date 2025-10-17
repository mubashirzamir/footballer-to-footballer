import { Link } from 'react-router'
import { Button } from '@/components/ui/button.tsx'
import type { GameInfo } from '@/structures'
import Text from '@/components/Text.tsx'

interface StartProps {
    gameInfo: GameInfo
}

const Start = ({ gameInfo }: StartProps) => {
    const { startPlayer, endPlayer } = gameInfo

    return (
        <Button className="cursor-pointer">
            <Link to={`play/${startPlayer.id}/${endPlayer.id}`}>
                <Text text="Start" />
            </Link>
        </Button>
    )
}

export default Start
