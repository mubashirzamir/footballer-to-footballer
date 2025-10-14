export class Player {
    id: string
    name: string = ''
    imageUrl: string = '/ball.svg'

    constructor(id: string) {
        this.id = id
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
