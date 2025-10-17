interface TextProps {
    text: string
    className?: string
}

const Text = ({ text, className }: TextProps) => {
    return (
        <span className={`text-center block whitespace-normal break-words ${className}`} title={text} aria-label={text}>
            {text}
        </span>
    )
}

export default Text
