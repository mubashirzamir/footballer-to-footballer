import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate, useParams } from 'react-router'

interface DirectionProps {
    className?: string
    mutable?: boolean
}

const DIRECTION_LEFT = 'left'
const DIRECTION_RIGHT = 'right'

type DirectionType = typeof DIRECTION_LEFT | typeof DIRECTION_RIGHT

const Direction = (props: DirectionProps) => {
    const { className = 'text-6xl', mutable = false } = props

    const { start_player_id: startPlayerId, end_player_id: endPlayerId } = useParams()
    const navigate = useNavigate()
    const [direction, setDirection] = useState<DirectionType>(DIRECTION_RIGHT)

    // TODO: Ask confirmation
    const onClick = () => {
        if (!mutable) return

        setDirection(direction === DIRECTION_LEFT ? DIRECTION_RIGHT : DIRECTION_LEFT)
        navigate(`/play/${endPlayerId}/${startPlayerId}`)
    }

    const arrow = () => {
        return <span className={className}>{direction === DIRECTION_LEFT ? '→' : '→'}</span>
    }

    return (
        <div>
            {mutable ? (
                <Button variant="ghost" onClick={onClick}>
                    {arrow()}
                </Button>
            ) : (
                arrow()
            )}
        </div>
    )
}

export default Direction
