import Start from './Start.tsx'
import Direction from '@/components/Direction.tsx'
import PrimaryPlayer from '@/pages/Home/PrimaryPlayer.tsx'
import useGameInfoFromDb from '@/hooks/useGameInfoFromDb.tsx'
import NextGameTimer from '@/pages/Home/NextGameTimer.tsx'

const Home = () => {
    const { gameInfo } = useGameInfoFromDb() // TODO: Optimize with context

    // TODO: Optimize tailwind
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 gap-4">
            <div className="flex flex-row items-center justify-center space-x-4 md:space-x-8 w-full max-w-md">
                <PrimaryPlayer player={gameInfo.startPlayer} />
                <Direction />
                <PrimaryPlayer player={gameInfo.endPlayer} />
            </div>
            <div>
                {/*TODO: Should I pass this as a prop or not? */}
                <Start gameInfo={gameInfo} />
            </div>
            <div>
                <NextGameTimer />
            </div>
        </div>
    )
}

export default Home
