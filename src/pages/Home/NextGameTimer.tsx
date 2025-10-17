import useNextGameTimer from '@/hooks/useNextGameTimer.tsx'
import Text from '@/components/Text.tsx'

const NextGameTimer = () => {
    return <Text text={`Next Challenge: ${useNextGameTimer()}`} />
}

export default NextGameTimer
