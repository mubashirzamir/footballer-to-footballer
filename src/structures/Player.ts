import type { Playable, PlayableType } from '@/structures/Playable.ts'

export class Player implements Playable {
    id: string
    name: string = ''
    imageUrl: string = '/ball.svg'
    type: PlayableType = 'player'

    constructor(id: string) {
        this.id = id
    }

    static instance(id: string) {
        return new Player(id)
    }

    setName(name: string) {
        this.name = name

        return this
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl

        return this
    }
}
