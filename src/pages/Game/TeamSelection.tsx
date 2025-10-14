import { useEffect, useState } from 'react'
import PlayerImage from '@/components/PlayerImage.tsx'
import { Search } from '@/pages/Game/PlayerSelection.tsx'
import { DELAY } from '@/utils/constants.ts'
import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'
import { teamList } from '@/utils/mock.ts'
import BaseSpinner from '@/components/BaseSpinner.tsx'

interface TeamSelectionProps {
    player: Player
    setTeam: (team: Team) => void
}

const TeamSelection = (props: TeamSelectionProps) => {
    const { player, setTeam } = props

    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setTeams(teamList)
            setLoading(false)
        }, DELAY)
    }, [player])

    const onTeamSelect = (team: Team) => {
        setTeam(team)
    }

    if (loading) {
        return <BaseSpinner className="size-8" />
    }

    // TODO: Dates do not look good.
    return (
        <div>
            <div className="text-xl font-medium flex justify-center">History of {player.name}</div>
            <div className="my-2">
                <Search />
            </div>
            {teams.map((team) => (
                <div
                    key={team.id}
                    className="flex flex-row items-center gap-4 cursor-pointer hover:bg-muted p-2"
                    onClick={() => onTeamSelect(team)}
                >
                    <div className="size-32">
                        <PlayerImage imageUrl={team.imageUrl} />
                    </div>
                    <div>
                        <div>{team.name}</div>
                        <div>
                            <em>
                                {team.startDate} - {team.endDate}
                            </em>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TeamSelection
