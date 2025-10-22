import { Button } from '@/components/ui/button.tsx'
import { useParams } from 'react-router'
import Text from '@/components/Text.tsx'

interface DirectionProps {
    className?: string
    mutable?: boolean
}

const Direction = (props: DirectionProps) => {
    const { className = 'text-6xl', mutable = false } = props

    const { start_player_id: startPlayerId, end_player_id: endPlayerId } = useParams()

    const onClick = () => {
        if (!mutable) return

        window.location.href = `/play/${endPlayerId}/${startPlayerId}`
    }

    const arrow = () => {
        return <Text text="➔" className={className} />
    }

    return (
        <div>
            {mutable ? (
                <Button className="hover:rotate-180" variant="ghost" onClick={onClick}>
                    {arrow()}
                </Button>
            ) : (
                arrow()
            )}
        </div>
    )
}

export default Direction
