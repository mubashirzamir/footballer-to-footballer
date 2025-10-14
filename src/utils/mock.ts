import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'

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
