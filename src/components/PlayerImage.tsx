import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

const PlayerImage = () => {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Player Image</AvatarFallback>
        </Avatar>
    )
}

export default PlayerImage
