import type { Player } from '@/structures/Player.ts'
import type { Playable } from '@/structures/Playable.ts'

export type Game = {
    start_player_id: string
    start_player_name: string
    end_player_id: string
    end_player_name: string
}

export type GameState = Playable[]

export type GameInfo = {
    startPlayer: Player
    endPlayer: Player
}

export type GameDriver = {
    gameInfo: GameInfo
    loading: boolean
}
