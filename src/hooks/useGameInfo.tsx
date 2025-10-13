import { games } from '@/utils/db.tsx'

export type GameInfo = {
    startPlayer: Player
    endPlayer: Player
}

export type Player = {
    id: string
    name: string
}

const useGameInfo = (): GameInfo => {
    const date = new Date().toISOString().split('T')[0]

    return {
        startPlayer: {
            id: games[date].start_player_id,
            name: games[date].start_player_name,
        },
        endPlayer: {
            id: games[date].end_player_id,
            name: games[date].end_player_name,
        },
    }
}

export default useGameInfo
