import { Link } from 'react-router'
import { Button } from '@/components/ui/button.tsx'

const Start = () => {
    return (
        <Button>
            <Link to="play/{start_id}/{end_id}">Start</Link>
        </Button>
    )
}

export default Start
