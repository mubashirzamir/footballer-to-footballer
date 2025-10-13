import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

interface PlayerHistoryProps {
    player: string
    setTeam: (teamId: string) => void
}

const TeamSelection = (props: PlayerHistoryProps) => {
    const { player, setTeam } = props

    console.log(player)

    const onTeamSelect = () => {
        setTeam('abc')
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
                    <TableRow className="cursor-pointer" onClick={onTeamSelect}>
                        <TableCell>
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center gap-2">
                                    <Avatar className="size-12">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>Crest</AvatarFallback>
                                    </Avatar>
                                    <span>Manchester United</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>22 September 2022</TableCell>
                        <TableCell>25 September 2025</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default TeamSelection
