import Text from '@/components/Text.tsx'

const Timer = ({ time }: { time: number }) => {
    return <Text className="text-sm">
        {time}
    </Text>
}

export default Timer
