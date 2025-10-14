import { games } from '@/utils/db.tsx'
import { useEffect, useState } from 'react'
import { DELAY } from '@/utils/constants.ts'
import type { GameDriver, GameInfo } from '@/structures'
import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'

const useGameInfo = (): GameDriver => {
    const date = new Date().toISOString().split('T')[0]
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState<GameInfo>({
        startPlayer: Player.instance(games[date].start_player_id)
            .setName(games[date].start_player_name)
            .setImageUrl('/ball.svg'),
        endPlayer: Player.instance(games[date].end_player_id)
            .setName(games[date].end_player_name)
            .setImageUrl('/ball.svg'),
    })

    // TODO: Awfully similar to useGameInfoFromLocation, refactor to remove duplication
    useEffect(() => {
        // Placeholder for API call to fetch player info
        setLoading(true)
        setTimeout(() => {
            setInfo((info) => ({
                startPlayer: Player.instance(info.startPlayer.id)
                    .setName(playerList.find((p) => p.id === info.startPlayer.id)?.name ?? '')
                    .setImageUrl('https://github.com/shadcn.png'),
                endPlayer: Player.instance(info.endPlayer.id)
                    .setName(playerList.find((p) => p.id === info.endPlayer.id)?.name ?? '')
                    .setImageUrl('https://github.com/shadcn.png'),
            }))

            setLoading(false)
        }, DELAY)
    }, [])

    return { gameInfo: info, loading }
}

export default useGameInfo

export const playerList: Player[] = [
    Player.instance('abc').setName('Fernando Torres').setImageUrl('https://github.com/shadcn.png'),
    Player.instance('def').setName('Wayne Rooney').setImageUrl('https://github.com/shadcn.png'),
    Player.instance('ghi').setName('Cristiano Ronaldo').setImageUrl('https://github.com/shadcn.png'),
]

export const teamList = [
    Team.instance('team1')
        .setName('FC Barcelona')
        .setStartDate('2004-09-01')
        .setEndDate('2010-07-01')
        .setImageUrl('https://github.com/shadcn.png'),
    Team.instance('team2')
        .setName('Manchester United')
        .setStartDate('2004-07-01')
        .setEndDate('2009-06-30')
        .setImageUrl('https://github.com/shadcn.png'),
    Team.instance('team3')
        .setName('Real Madrid')
        .setStartDate('2009-07-01')
        .setEndDate('2018-07-01')
        .setImageUrl('https://github.com/shadcn.png'),
]
