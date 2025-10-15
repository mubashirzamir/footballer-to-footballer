import { Button } from '@/components/ui/button.tsx'
import { useNavigate, useParams } from 'react-router'

interface DirectionProps {
    className?: string
    mutable?: boolean
}

// TODO: Separate logic and presentation
const Direction = (props: DirectionProps) => {
    const { className = 'text-6xl', mutable = false } = props

    const { start_player_id: startPlayerId, end_player_id: endPlayerId } = useParams()
    const navigate = useNavigate()

    // TODO: Ask confirmation
    const onClick = () => {
        if (!mutable) return

        navigate(`/play/${endPlayerId}/${startPlayerId}`)
    }

    const arrow = () => {
        return <span className={className}>→</span>
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
