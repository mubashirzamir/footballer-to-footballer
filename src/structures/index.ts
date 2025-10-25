import type { Player } from '@/structures/Player.ts'
import type { Playable } from '@/structures/Playable.ts'

export type Game = {
    start_player_id: string
    start_player_name: string
    end_player_id: string
    end_player_name: string
    contributor: string
}

export type GameState = Playable[]

export type GameInfo = {
    startPlayer: Player
    endPlayer: Player
    contributor: string
}

export type ProfileHealth = {
    loading: boolean
    isError: boolean
    error: unknown
}

export type InfoHealth = {
    startPlayer: ProfileHealth
    endPlayer: ProfileHealth
}

export type GameDriver = {
    gameInfo: GameInfo
    infoHealth: InfoHealth
}
