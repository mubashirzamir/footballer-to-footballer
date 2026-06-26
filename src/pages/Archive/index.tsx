import { Link } from 'react-router'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'
import { GAMES } from '@/utils/db.tsx'

const Archive = () => {
    const today = new Date().toLocaleDateString('en-CA')
    const entries = Object.entries(GAMES).filter(([date]) => date <= today)

    return (
        <div className="flex flex-col min-h-screen gap-4 p-2 md:p-8">
            <Text className="text-start text-3xl">{__.messages.archive.title}</Text>
            {entries.length === 0 ? (
                <Text className="text-start">{__.messages.archive.no_games}</Text>
            ) : (
                <div className="flex flex-col gap-2">
                    {entries.map(([date, game]) => (
                        <Link
                            key={date}
                            to={`/play/${game.start_player_id}/${game.end_player_id}`}
                            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-muted transition-colors border"
                        >
                            <div className="flex items-center gap-2">
                                <Text className="font-medium">{game.start_player_name}</Text>
                                <Text className="text-muted-foreground">→</Text>
                                <Text className="font-medium">{game.end_player_name}</Text>
                            </div>
                            <Text className="text-sm text-muted-foreground">{date}</Text>
                            <Text className="text-sm text-muted-foreground italic">{game.contributor}</Text>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Archive
