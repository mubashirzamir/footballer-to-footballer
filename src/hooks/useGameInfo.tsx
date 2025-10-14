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

export const playerList: Player[] = [
    { id: 'abc', name: 'Fernando Torres' },
    { id: 'def', name: 'Cristiano Ronaldo' },
    { id: 'ghi', name: 'Lionel Messi' },
    { id: 'jkl', name: 'Neymar Jr.' },
    { id: 'mno', name: 'Kylian Mbappé' },
    { id: 'pqr', name: 'Zlatan Ibrahimović' },
]

export const teamList = [
    { id: 'team1', name: 'FC Barcelona', startDate: '2004-09-01', endDate: '2010-07-01' },
    { id: 'team2', name: 'Real Madrid', startDate: '2010-07-01', endDate: '2013-07-01' },
    { id: 'team3', name: 'Chelsea FC', startDate: '2013-07-01', endDate: '2015-07-01' },
    { id: 'team4', name: 'AC Milan', startDate: '2015-07-01', endDate: '2017-07-01' },
    { id: 'team5', name: 'Liverpool FC', startDate: '2017-07-01', endDate: '2020-07-01' },
    { id: 'team6', name: 'Atlético Madrid', startDate: '2020-07-01', endDate: '2023-07-01' },
]
