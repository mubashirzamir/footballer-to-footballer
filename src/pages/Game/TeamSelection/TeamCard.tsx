import PlayableImage from '@/components/PlayableImage.tsx'
import { Team } from '@/structures/Team.ts'
import Text from '@/components/Text.tsx'

interface TeamCardProps {
    team: Team
    onTeamSelect: (team: Team) => void
}

const TeamCard = ({ team, onTeamSelect }: TeamCardProps) => {
    const hoverClass = team.withoutClub ? 'cursor-not-allowed' : 'cursor-pointer'

    return (
        <div
            className={`flex flex-row items-center gap-4 hover:bg-muted py-2 border-b-2 ${hoverClass}`}
            onClick={() => onTeamSelect(team)}
        >
            <div className="w-24 h-24 md:w-32 md:h-32">
                <PlayableImage imageUrl={team.imageUrl} />
            </div>
            <div>
                <Text className="text-start font-bold">{team.name}</Text>
                <Text className="text-start">{team.getSeasonRange()}</Text>
            </div>
        </div>
    )
}

export default TeamCard
