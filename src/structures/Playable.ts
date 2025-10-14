import { Player } from '@/structures/Player.ts'
import { Team } from '@/structures/Team.ts'

// TODO: Can we use constants or enums here?
export type PlayableType = 'player' | 'team'

export class Playable {
    id: string
    name: string
    imageUrl: string
    type: PlayableType

    constructor(playable: Player | Team) {
        this.id = playable.id
        this.name = playable.name
        this.imageUrl = playable.imageUrl

        switch (true) {
            case playable instanceof Player:
                this.type = 'player'
                break
            case playable instanceof Team:
                this.type = 'team'
                break
            default:
                throw new Error('Invalid playable type')
        }
    }
}
