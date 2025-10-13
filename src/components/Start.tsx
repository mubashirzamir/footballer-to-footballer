import { Link } from 'react-router'

const Start = () => {
    return (
        <button>
            <Link to="play/{start_id}/{end_id}">Start</Link>
        </button>
    )
}

export default Start
