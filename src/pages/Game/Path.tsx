import type { GameState } from '@/pages/Game/index.tsx'
import PlayerImage from '@/components/PlayerImage.tsx'
import Direction from '@/components/Direction.tsx'

interface PathProps {
    state: GameState
}

const Path = (props: PathProps) => {
    const { state } = props

    console.log(state)

    return (
        <div className="flex flex-col">
            <div className="flex flex-row space-x-8">
                <div className="size-16">
                    <PlayerImage />
                </div>
                <Direction /> {/* TODO: Size too big, maybe configurable? */}
                <div className="size-16">
                    <PlayerImage />
                </div>
            </div>
        </div>
    )
}

export default Path
