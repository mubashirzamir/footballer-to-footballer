import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import ball from '@/assets/ball.svg'

interface PlayerImageProps {
    imageUrl?: string
}

const PlayableImage = ({ imageUrl }: PlayerImageProps) => {
    // TODO: Sensible fallback image in assets
    return (
        <Avatar>
            <AvatarImage src={imageUrl} className="object-contain w-full h-full" />
            <AvatarFallback>
                <img src={ball} alt="Fallback" />
            </AvatarFallback>
        </Avatar>
    )
}

export default PlayableImage
