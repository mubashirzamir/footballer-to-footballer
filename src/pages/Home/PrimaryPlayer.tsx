import PlayerImage from '@/components/PlayerImage.tsx'
import { useEffect } from 'react'
import type { Player } from '@/hooks/useGameInfo.tsx'

interface PrimaryPlayerProps {
    player: Player
}

const PrimaryPlayer = (props: PrimaryPlayerProps) => {
    const { player } = props

    useEffect(() => {
        // API call to fetch player image or data if needed
    }, [player])

    return (
        <div>
            <div className="size-96">
                <PlayerImage />
            </div>
            <span className="text-xl font-bold mt-4 block text-center">{player.name}</span>
        </div>
    )
}

export default PrimaryPlayer
