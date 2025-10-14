import type { ReactNode } from 'react'

interface TurnInfoProps {
    children: ReactNode
}

const TurnInfo = ({ children }: TurnInfoProps) => {
    return <div className="text-xl font-medium flex justify-center">{children}</div>
}

export default TurnInfo
