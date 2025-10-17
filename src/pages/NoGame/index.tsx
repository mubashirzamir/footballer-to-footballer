import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

const NoGame = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Text className="md:text-3xl sm:text-2xl text-xl font-bold mb-4">{__.errors.no_game_today}</Text>
        </div>
    )
}

export default NoGame
