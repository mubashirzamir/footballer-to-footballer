export interface Playable {
    id: string
    name: string
    imageUrl: string
    readonly entityType: 'player' | 'team'
}
