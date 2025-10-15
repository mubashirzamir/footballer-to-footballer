import type { Playable, PlayableType } from '@/structures/Playable.ts'

export class Team implements Playable {
    id: string
    name: string = ''
    startDate: string = '2024-01-01'
    endDate: string = '2024-12-31'
    season: string = ''
    imageUrl: string = '/ball.svg'
    type: PlayableType = 'team'

    constructor(id: string) {
        this.id = id
    }

    static instance(id: string) {
        return new Team(id)
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

    setSeason(season: string) {
        this.season = season

        return this
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl

        return this
    }
}
