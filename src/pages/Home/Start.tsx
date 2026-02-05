import { Link } from 'react-router'
import { Button } from '@/components/ui/button.tsx'
import type { GameInfo } from '@/structures'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

interface StartProps {
    gameInfo: GameInfo
}

const Start = ({ gameInfo }: StartProps) => {
    const { startPlayer, endPlayer } = gameInfo

    return (
        <Button asChild className="cursor-pointer">
            <Link to={`play/${startPlayer.id}/${endPlayer.id}`}>
                <Text>
                    {__.messages.home.start}
                </Text>
            </Link>
        </Button>
    )
}

export default Start
