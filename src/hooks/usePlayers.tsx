import { useEffect, useState } from 'react'
import { Player } from '@/structures/Player.ts'
import { playerList } from '@/utils/mock.ts'
import { DELAY } from '@/utils/constants.ts'
import { Team } from '@/structures/Team.ts'

const usePlayers = (team: Team) => {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setPlayers(playerList)
            setLoading(false)
        }, DELAY)
    }, [team])

    return { players, loading }
}

export default usePlayers
