import { Link } from 'react-router'
import { Button } from '@/components/ui/button.tsx'
import useGameInfo from '@/hooks/useGameInfo.tsx'

const Start = () => {
    const {startPlayer, endPlayer} = useGameInfo()

    return (
        <Button className="cursor-pointer">
            <Link to={`play/${startPlayer.id}/${endPlayer.id}`}>Start</Link>
        </Button>
    )
}

export default Start
