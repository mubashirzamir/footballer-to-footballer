import PlayableImage from '@/components/PlayableImage.tsx'
import { Team } from '@/structures/Team.ts'

interface TeamCardProps {
    team: Team
    onTeamSelect: (team: Team) => void
}
const TeamCard = ({ team, onTeamSelect }: TeamCardProps) => {
    return (
        <div
            key={team.id}
            className="flex flex-row items-center gap-4 cursor-pointer hover:bg-muted p-2"
            onClick={() => onTeamSelect(team)}
        >
            <div className="size-32">
                <PlayableImage imageUrl={team.imageUrl} />
            </div>
            <div>
                <div>{team.name}</div>
                <div>
                    <strong>
                        {team.seasonStart} - {team.seasonEnd}
                    </strong>
                </div>
            </div>
        </div>
    )
}

export default TeamCard
