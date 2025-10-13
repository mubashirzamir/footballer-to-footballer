import { useState } from 'react'

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

    return (
        <div>
            <button onClick={onClick}>{direction === DIRECTION_LEFT ? '←' : '→'}</button>
        </div>
    )
}

export default Direction
