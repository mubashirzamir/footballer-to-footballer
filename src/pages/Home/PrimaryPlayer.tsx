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
        <div className="flex flex-col items-center">
            <div className="md:size-80 sm:size-64 size-24">
                <PlayerImage />
            </div>
            <span className="text-xl size-24 font-bold mt-4">{player.name}</span>
        </div>
    )
}

export default PrimaryPlayer
