import type { Playable } from '@/structures/Playable.ts'

export class Player implements Playable {
    id: string
    name: string = ''
    imageUrl: string = '/ball.svg'
    readonly entityType = 'player'

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
