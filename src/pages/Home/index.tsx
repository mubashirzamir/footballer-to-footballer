import Start from './Start.tsx'
import Direction from '@/components/Direction.tsx'
import PrimaryPlayer from '@/pages/Home/PrimaryPlayer.tsx'
import useGameInfoFromDb from '@/hooks/useGameInfoFromDb.tsx'
import NextGameTimer from '@/pages/Home/NextGameTimer.tsx'
import NoGame from '@/pages/NoGame'

const Home = () => {
    const { gameInfo } = useGameInfoFromDb() // TODO: Optimize with context

    if (gameInfo.startPlayer.id === 'unknown') {
        return <NoGame />
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-8">
            <div className="flex flex-row items-center justify-center space-x-4 md:space-x-8 w-full max-w-md">
                <PrimaryPlayer player={gameInfo.startPlayer} />
                <Direction className="md:text-6xl sm:text-4xl text-2xl max-w-[2rem]" />
                <PrimaryPlayer player={gameInfo.endPlayer} />
            </div>
            <Start gameInfo={gameInfo} />
            <NextGameTimer />
        </div>
    )
}

export default Home
