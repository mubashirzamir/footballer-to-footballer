import Start from './Start.tsx'
import Direction from '@/components/Direction.tsx'
import PrimaryPlayer from '@/pages/Home/PrimaryPlayer.tsx'
import useGameInfoFromDb from '@/hooks/useGameInfoFromDb.tsx'
import NextGameTimer from '@/pages/Home/NextGameTimer.tsx'
import ShowHelp from '@/pages/Home/ShowHelp.tsx'
import Contributor from '@/pages/Home/Contributor.tsx'

const Home = () => {
    const { gameInfo } = useGameInfoFromDb()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-8">
            <div className="mb-4">
                <ShowHelp />
            </div>
            <div className="flex flex-row items-center justify-center sm:space-x-8 w-full">
                <PrimaryPlayer player={gameInfo.startPlayer} />
                <Direction className="md:text-6xl sm:text-4xl text-2xl max-w-[4rem]" />
                <PrimaryPlayer player={gameInfo.endPlayer} />
            </div>
            <Start gameInfo={gameInfo} />
            <NextGameTimer />
            <Contributor />
        </div>
    )
}

export default Home
