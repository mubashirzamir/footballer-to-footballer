import PlayableImage from '@/components/PlayableImage.tsx'
import { Team } from '@/structures/Team.ts'

interface TeamCardProps {
    team: Team
    onTeamSelect: (team: Team) => void
}
const TeamCard = ({ team, onTeamSelect }: TeamCardProps) => {
    const hoverClass = team.withoutClub ? 'cursor-not-allowed' : 'cursor-pointer'

    return (
        <div
            key={team.id}
            className={`flex flex-row items-center gap-4 hover:bg-muted p-2 ${hoverClass}`}
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
