import useNextGameTimer from '@/hooks/useNextGameTimer.tsx'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

const NextGameTimer = () => {
    return (
        <Text>
            {__.messages.home.next_challenge}: {useNextGameTimer()}
        </Text>
    )
}

export default NextGameTimer
