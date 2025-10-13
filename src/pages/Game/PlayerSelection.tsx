import { Input } from '@/components/ui/input.tsx'
import PlayerImage from '@/components/PlayerImage.tsx'

interface PlayerSelectionProps {
    team: string
    setPlayer: (playerId: string) => void
}

const PlayerSelection = (props: PlayerSelectionProps) => {
    const { team, setPlayer } = props

    console.log(team)

    const onPlayerSelect = () => {
        setPlayer('xyz')
    }

    return (
        <div>
            <div className="mb-2 text-lg font-medium flex justify-center">22 September 2022 - 25 September 2025</div>
            <Search />
            <hr />
            <div className="flex flex-row items-center gap-12 mt-4 cursor-pointer" onClick={onPlayerSelect}>
                <div className="size-36">
                    <PlayerImage />
                </div>
                <span>Fernando Torres</span>
            </div>
        </div>
    )
}

const Search = () => {
    return <Input name="search" placeholder="Search player..." />
}

export default PlayerSelection
