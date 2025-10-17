import type { Playable } from '@/structures/Playable.ts'

export class Team implements Playable {
    id: string
    name: string = ''
    startDate: string = ''
    endDate: string = ''
    seasonStart: string = ''
    seasonEnd: string = ''
    imageUrl: string = '/ball.svg'
    withoutClub: boolean = false
    readonly entityType = 'team'

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

    setSeasonStart(season: string) {
        this.seasonStart = season

        return this
    }

    setSeasonEnd(season: string) {
        this.seasonEnd = season

        return this
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl

        return this
    }

    setWithoutClub(withoutClub: boolean = true) {
        this.withoutClub = withoutClub

        return this
    }

    getCompactSeasonRange() {
        return this.seasonStart.split('/')[0] + '-' + this.seasonEnd.split('/')[1]
    }

    // TODO: This method is not entirely accurate
    // TODO: Invert the loop instead of reversing the array at the end
    getSeasons() {
        const seasons = []
        const firstSeasonYear = Team.convertToYear(this.seasonStart) // e.g., "04/05" -> 2004
        const lastSeasonYear = Team.convertToYear(this.seasonEnd) // e.g., "10/11" -> 2010

        for (let year = firstSeasonYear; year <= lastSeasonYear; year++) {
            seasons.push({ id: `${year}`, text: `${year}/${year + 1}` }) // e.g., 2004 -> "2004/2005"
        }

        return seasons.reverse()
    }

    static convertToYear(season: string) {
        const year = parseInt(season.split('/')[0])

        return year >= 50 ? 1900 + year : 2000 + year
    }

    static convertYearToSeason(year: number) {
        return `${year % 100}/${(year + 1) % 100}`
    }
}
