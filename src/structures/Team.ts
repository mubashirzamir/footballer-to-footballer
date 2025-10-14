export class Team {
    id: string
    name: string = ''
    startDate: string = '2024-01-01'
    endDate: string = '2024-12-31'
    imageUrl: string = '/ball.svg'

    constructor(id: string) {
        this.id = id
    }

    setName(name: string) {
        this.name = name

        return this
    }

    setStartDate(startDate: string) {
        this.startDate = startDate

        return this
    }

    setEndDate(endDate: string) {
        this.endDate = endDate

        return this
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl

        return this
    }
}
