import type { Player } from '@/structures/Player.ts'
import type { Playable } from '@/structures/Playable.ts'

export type GameState = Playable[]

export type GameInfo = {
    startPlayer: Player
    endPlayer: Player
}

export type GameDriver = {
    gameInfo: GameInfo
    loading: boolean
}

export const GamePhase = {
    PlayerSelection: 'PLAYER_SELECTION',
    TeamSelection: 'TEAM_SELECTION',
    Won: 'WON',
}
