import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'
import useGameInfoFromDb from '@/hooks/useGameInfoFromDb.tsx'

const Contributor = () => {
    const { gameInfo } = useGameInfoFromDb()

    return (
        <div>
            <Text className="italic">
                {__.messages.home.contributor} {gameInfo.contributor}
            </Text>
            <Text className="italic underline">
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

export default Contributor
