interface EmptyProps {
    length: number
    message?: string
}

const Empty = ({ length, message }: EmptyProps) => {
    if (length > 0) return

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <strong className="font-bold text-lg">{message || 'No items to show'}</strong>
        </div>
    )
}

export default Empty
