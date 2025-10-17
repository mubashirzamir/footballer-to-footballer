import request from '@/request.js'
import { useQuery } from '@tanstack/react-query'
import { Player } from '@/structures/Player.ts'
import type { UseServicePlayerProfileContract } from '@/services/useServicePlayerProfile.tsx'

interface PlayerProfileResponse {
    updatedAt: string
    id: string
    url: string
    name: string
    description: string
    fullName: string
    nameInHomeCountry: string
    imageUrl: string
    dateOfBirth: string
    placeOfBirth: {
        city: string
        country: string
    }
    age: number
    height: number
    citizenship: string[]
    isRetired: boolean
    retiredSince: string
    position: {
        main: string
        other: string[]
    }
    foot: string
    shirtNumber: string
    club: {
        id: string
        name: string
        joined: string
        contractExpires: string
        contractOption: string
        lastClubId: string
        lastClubName: string
        mostGamesFor: string
    }
    marketValue: number
    agent: {
        name: string
        url: string
    }
    outfitter: string
    socialMedia: string[]
    trainerProfile: {
        id: string
        url: string
        position: string
    }
    relatives: Array<{
        id: string
        url: string
        name: string
        profileType: 'player' | string
    }>
}

const getPlayerProfile = async (playerId: string): Promise<PlayerProfileResponse> => {
    return await request.get(`/players/${playerId}/profile`)
}

const useServiceProfile: UseServicePlayerProfileContract = (dehydratedPlayer: Player) => {
    const {
        data: player = dehydratedPlayer,
        isLoading: loading,
        isError,
        error,
    } = useQuery({
        staleTime: Infinity,
        placeholderData: dehydratedPlayer,
        queryKey: ['player_profile', dehydratedPlayer.id],
        queryFn: async (): Promise<Player> => {
            const response = await getPlayerProfile(dehydratedPlayer.id)

            return transformProfileToPlayer(response)
        },
    })

    return { player, loading, isError, error }
}

const transformProfileToPlayer = (profile: PlayerProfileResponse): Player => {
    return Player.instance(profile.id).setName(profile.name).setImageUrl(profile.imageUrl)
}

export default useServiceProfile
