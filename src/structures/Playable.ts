// TODO: Can we use constants or enums here?
export type PlayableType = 'player' | 'team'

export interface Playable {
    id: string
    name: string
    imageUrl: string
    type: PlayableType
}
