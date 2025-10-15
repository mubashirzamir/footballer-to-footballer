import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'
import type { GameState } from '@/structures'

export const mockGameState: GameState = [
    Player.instance('abc').setName('Fernando Torres').setImageUrl('https://github.com/shadcn.png'),
    Team.instance('team1')
        .setName('FC Barcelona')
        .setStartDate('2004-09-01')
        .setEndDate('2010-07-01')
        .setImageUrl('https://github.com/shadcn.png'),
    Player.instance('def').setName('Wayne Rooney').setImageUrl('https://github.com/shadcn.png'),
]
