import Text from '@/components/Text.tsx'

const Timer = ({ time }: { time: number }) => {
    return <Text text={`${time}s`} className="font-bold md:text-2xl text-xl" />
}

export default Timer
