import type { ReactNode } from 'react'

interface WinCardProps {
    children: ReactNode
}

const WinCard = ({ children }: WinCardProps) => {
    return <div className="border-2 flex flex-col items-center justify-center p-4 min-h-[6rem]">{children}</div>
}

export default WinCard
