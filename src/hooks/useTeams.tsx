import { useEffect, useState } from 'react'
import { Team } from '@/structures/Team.ts'
import { teamList } from '@/utils/mock.ts'
import { DELAY } from '@/utils/constants.ts'
import { Player } from '@/structures/Player.ts'

const useTeams = (player: Player) => {
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setTeams(teamList)
            setLoading(false)
        }, DELAY)
    }, [player])

    return { teams, loading }
}

export default useTeams
