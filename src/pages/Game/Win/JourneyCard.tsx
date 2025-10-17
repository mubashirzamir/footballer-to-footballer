import type { ReactNode } from 'react'

interface JourneyCardProps {
    children: ReactNode
}

const JourneyCard = ({ children }: JourneyCardProps) => {
    return <div className="border-2 p-4 md:p-8">{children}</div>
}

export default JourneyCard
