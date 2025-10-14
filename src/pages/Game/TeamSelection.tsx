import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import type { Team } from '@/pages/Game/index.tsx'
import { type Player, teamList } from '@/hooks/useGameInfo.tsx'
import { useEffect, useState } from 'react'

interface PlayerHistoryProps {
    player: Player
    setTeam: (team: Team) => void
}

const TeamSelection = (props: PlayerHistoryProps) => {
    const [teams, setTeams] = useState<Team[]>([])
    const { player, setTeam } = props

    useEffect(() => {
        setTeams(teamList)
    }, [player])

    const onTeamSelect = (team: Team) => {
        setTeam(team)
    }

    return (
        <div className="border">
            {/* TODO: Convert Table to Cards for better mobile support */}
            <Table>
                <TableBody>
                    <TableRow>
                        <TableHead>
                            <strong>Club</strong>
                        </TableHead>
                        <TableHead>
                            <strong>Start Date</strong>
                        </TableHead>
                        <TableHead>
                            <strong>End Date</strong>
                        </TableHead>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {teams.map((team) => (
                        <TableRow key={team.id} className="cursor-pointer" onClick={() => onTeamSelect(team)}>
                            <TableCell>
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center gap-2">
                                        <Avatar className="size-12">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>{team.name}</AvatarFallback>
                                        </Avatar>
                                        <span>{team.name}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{team.startDate}</TableCell>
                            <TableCell>{team.endDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamSelection
