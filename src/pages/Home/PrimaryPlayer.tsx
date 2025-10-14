import PlayerImage from '@/components/PlayerImage.tsx'
import { useEffect, useState } from 'react'
import { type Player, playerList } from '@/hooks/useGameInfo.tsx'

interface PrimaryPlayerProps {
    player: Player
}

const PrimaryPlayer = (props: PrimaryPlayerProps) => {
    const { player: initialPlayer } = props

    const [player, setPlayer] = useState<Player>()

    useEffect(() => {
        /**
         * TODO:
         * Placeholder for fetching player data from an API
         * Abort if user starts game before fetch completes
         */
        setTimeout(() => {
            setPlayer(playerList.find((p) => p.id === initialPlayer.id) ?? playerList[0])
        }, 3000)
    }, [initialPlayer])

    return (
        <div>
            <div className="md:size-80 sm:size-64 size-24">
                <PlayerImage imageUrl={player?.imageUrl} />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-bold mt-4">{player?.name || initialPlayer.name}</span>
            </div>
        </div>
    )
}

export default PrimaryPlayer
