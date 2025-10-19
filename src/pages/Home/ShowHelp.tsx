import { __ } from '@/lang/lang.ts'
import Text from '@/components/Text.tsx'
import { Link } from 'react-router'

const ShowHelp = () => {
    return (
        <div>
            <Text>{__.messages.show_help}</Text>
            <Link className="underline" to="/help">
                <Text>{__.messages.show_help_link}</Text>
            </Link>
        </div>
    )
}

export default ShowHelp
