import type { GameState } from '@/pages/Game/index.tsx'

interface PathProps {
    state: GameState
}

const Path = (props: PathProps) => {
    const { state } = props

    console.log(state)

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center space-x-8">
                Path
            </div>
        </div>
    )
}

export default Path
