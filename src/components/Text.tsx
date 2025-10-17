interface TextProps {
    text: string
    className?: string
}

const Text = ({ text, className }: TextProps) => {
    return (
        <span className={`truncate text-center block text- ${className}`} title={text} aria-label={text}>
            {text}
        </span>
    )
}

export default Text
