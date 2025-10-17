import type { ReactNode } from 'react'

interface TurnInfoProps {
    children: ReactNode
}

const TurnInfo = ({ children }: TurnInfoProps) => {
    return <div>{children}</div>
}

export default TurnInfo
