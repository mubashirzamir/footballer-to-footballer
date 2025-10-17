import type { ReactNode } from 'react'

interface TextProps {
    text?: string
    children?: ReactNode // ideally string
    className?: string
}

const Text = ({ text, children, className }: TextProps) => {
    return (
        <span className={`text-center block whitespace-normal break-words ${className}`} title={text} aria-label={text}>
            {children || text}
        </span>
    )
}

export default Text
