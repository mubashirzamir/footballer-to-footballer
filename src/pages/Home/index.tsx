import Start from '@/components/Start.tsx'
import Direction from '@/components/Direction.tsx'
import PrimaryPlayer from '@/pages/Home/PrimaryPlayer.tsx'
import useGameInfo from '@/hooks/useGameInfo.tsx'

const Home = () => {
    const { startPlayer, endPlayer } = useGameInfo() // TODO: Optimize with context

    // TODO: Optimize tailwind
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
            <div className="flex flex-row items-center justify-center space-x-4 md:space-x-8 w-full max-w-md">
                <PrimaryPlayer player={startPlayer} />
                <Direction />
                <PrimaryPlayer player={endPlayer} />
            </div>
            <div className="mt-4">
                <Start />
            </div>
        </div>
    )
}

export default Home
