import Start from '@/components/Start.tsx'
import Direction from '@/components/Direction.tsx'
import PrimaryPlayer from '@/pages/Home/PrimaryPlayer.tsx'
import useGameInfo from '@/hooks/useGameInfo.tsx'


const Home = () => {
    const { startPlayer, endPlayer } = useGameInfo() // TODO: Optimize

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-row items-center justify-center space-x-8">
                <PrimaryPlayer player={startPlayer} />
                <Direction />
                <PrimaryPlayer player={endPlayer} />
            </div>
            <div className="mt-8">
                <Start />
            </div>
        </div>
    )
}

export default Home
