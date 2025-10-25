import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'
import type { GameInfo } from '@/structures'

// The data is here is encapsulated in functions to avoid needlessly creating objects at least that is my understanding.

export const MESSI = () =>
    Player.instance('Messi')
        .setName('Lionel Messi')
        .setImageUrl('https://img.a.transfermarkt.technology/portrait/header/28003-1740766555.jpg?lm=1')

export const DI_MARIA = () =>
    Player.instance('Di Maria')
        .setName('Angel Di Maria')
        .setImageUrl('https://img.a.transfermarkt.technology/portrait/medium/45320-1700648952.jpg?lm=1')

export const RONALDO = () =>
    Player.instance('Ronaldo')
        .setName('Cristiano Ronaldo')
        .setImageUrl('https://img.a.transfermarkt.technology/portrait/header/8198-1748102259.jpg?lm=1')

export const PSG = () =>
    Team.instance('PSG')
        .setName('PSG')
        .setSeasonStart('22/23')
        .setSeasonEnd('24/25')
        .setImageUrl('https://tmssl.akamaized.net//images/wappen/head/583.png?lm=1422087397')

export const REAL_MADRID = () =>
    Team.instance('Real Madrid')
        .setName('Real Madrid')
        .setSeasonStart('21/22')
        .setSeasonEnd('24/25')
        .setImageUrl('https://tmssl.akamaized.net//images/wappen/head/418.png?lm=1422087397')

export const GAME_STATE = () => [MESSI(), PSG(), DI_MARIA(), REAL_MADRID(), RONALDO()]

export const PLAYERS = () => [MESSI(), DI_MARIA(), RONALDO()]

export const TEAMS = () => [PSG(), REAL_MADRID()]

export const DEHYDRATED_MESSI = () => Player.instance('Messi')
export const DEHYDRATED_RONALDO = () => Player.instance('Ronaldo')

export const DEHHYDRATED_TO_HYDRATED_PLAYERS = (): Record<string, Player> => ({
    Messi: MESSI(),
    Ronaldo: RONALDO(),
})

export const GAME_INFO = (): GameInfo => ({
    startPlayer: DEHYDRATED_MESSI(),
    endPlayer: DEHYDRATED_RONALDO(),
    contributor: 'mushi',
})

export const SHORTEST_PATH = () => ({
    isShortest: true,
    message: 'Shortest path found',
    shortestPath: GAME_STATE(),
})
