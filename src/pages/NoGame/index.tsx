import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

const NoGame = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Text className="md:text-3xl sm:text-2xl text-xl font-bold mb-4">{__.errors.no_game_today}</Text>
            <Text className="md:text-3xl sm:text-2xl text-xl italic underline mb-4">
                <a
                    href="https://github.com/mubashirzamir/footballer-to-footballer/blob/main/src/utils/CONTRIBUTION_GUIDE.md"
                    target="_blank"
                >
                    {__.messages.home.how_to_contribute}
                </a>
            </Text>
        </div>
    )
}

export default NoGame
