import { games } from '@/utils/db.tsx'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'

export type GameInfo = {
    startPlayer: Player
    endPlayer: Player
}

export type Player = {
    id: string
    name: string
    imageUrl: string
}

type GameDriver = {
    gameInfo: GameInfo
    loading: boolean
}

const useGameInfo = (): GameDriver => {
    const date = new Date().toISOString().split('T')[0]
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState<GameInfo>({
        startPlayer: {
            id: games[date].start_player_id,
            name: games[date].start_player_name,
            imageUrl: '/ball.svg',
        },
        endPlayer: {
            id: games[date].end_player_id,
            name: games[date].end_player_name,
            imageUrl: '/ball.svg',
        },
    })

    // TODO: Awfully similar to useGameInfoFromLocation, refactor to remove duplication
    useEffect(() => {
        // Placeholder for API call to fetch player info
        setLoading(true)
        setTimeout(() => {
            setInfo((info) => ({
                startPlayer: {
                    id: info.startPlayer.id,
                    name: playerList.find((p) => p.id === info.startPlayer.id)?.name ?? '',
                    imageUrl: 'https://github.com/shadcn.png',
                },
                endPlayer: {
                    id: info.endPlayer.id,
                    name: playerList.find((p) => p.id === info.endPlayer.id)?.name ?? '',
                    imageUrl: 'https://github.com/shadcn.png',
                },
            }))

            setLoading(false)
        }, DELAY)
    }, [])

    return { gameInfo: info, loading }
}

export default useGameInfo

export const playerList: Player[] = [
    { id: 'abc', name: 'Fernando Torres', imageUrl: 'https://github.com/shadcn.png' },
    { id: 'xyz', name: 'Wayne Rooney', imageUrl: 'https://github.com/shadcn.png' },
    { id: 'ghi', name: 'Lionel Messi', imageUrl: 'https://github.com/shadcn.png' },
    { id: 'jkl', name: 'Neymar Jr.', imageUrl: 'https://github.com/shadcn.png' },
    { id: 'mno', name: 'Kylian Mbappé', imageUrl: 'https://github.com/shadcn.png' },
    { id: 'pqr', name: 'Zlatan Ibrahimović', imageUrl: 'https://github.com/shadcn.png' },
]

export const teamList = [
    {
        id: 'team1',
        name: 'FC Barcelona',
        startDate: '2004-09-01',
        endDate: '2010-07-01',
        imageUrl: 'https://github.com/shadcn.png',
    },
    {
        id: 'team2',
        name: 'Real Madrid',
        startDate: '2010-07-01',
        endDate: '2013-07-01',
        imageUrl: 'https://github.com/shadcn.png',
    },
    {
        id: 'team3',
        name: 'Chelsea FC',
        startDate: '2013-07-01',
        endDate: '2015-07-01',
        imageUrl: 'https://github.com/shadcn.png',
    },
    {
        id: 'team4',
        name: 'AC Milan',
        startDate: '2015-07-01',
        endDate: '2017-07-01',
        imageUrl: 'https://github.com/shadcn.png',
    },
    {
        id: 'team5',
        name: 'Liverpool FC',
        startDate: '2017-07-01',
        endDate: '2020-07-01',
        imageUrl: 'https://github.com/shadcn.png',
    },
    {
        id: 'team6',
        name: 'Atlético Madrid',
        startDate: '2020-07-01',
        endDate: '2023-07-01',
        imageUrl: 'https://github.com/shadcn.png',
    },
]
