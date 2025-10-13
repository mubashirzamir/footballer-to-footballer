import Start from '@/components/Start.tsx'
import Direction from '@/components/Direction.tsx'
import PrimaryPlayer from '@/pages/Home/PrimaryPlayer.tsx'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-row items-center justify-center space-x-8">
                <PrimaryPlayer />
                <Direction />
                <PrimaryPlayer />
            </div>
            <div className="mt-8">
                <Start />
            </div>
        </div>
    )
}

export default Home
