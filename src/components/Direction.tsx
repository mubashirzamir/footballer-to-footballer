import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'

interface DirectionProps {
    mutable?: boolean
}

const DIRECTION_LEFT = 'left'
const DIRECTION_RIGHT = 'right'

type DirectionType = typeof DIRECTION_LEFT | typeof DIRECTION_RIGHT

const Direction = (props: DirectionProps) => {
    const { mutable = false } = props

    const [direction, setDirection] = useState<DirectionType>(DIRECTION_RIGHT)

    const onClick = () => {
        if (!mutable) return

        setDirection(direction === DIRECTION_LEFT ? DIRECTION_RIGHT : DIRECTION_LEFT)
    }

    const arrow = () => {
        return <span className="text-4xl">{direction === DIRECTION_LEFT ? '←' : '→'}</span>
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
