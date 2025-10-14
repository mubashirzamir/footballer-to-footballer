// TODO:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Fallback = ({ error }) => {
    const isDevelopment = true

    const message = isDevelopment ? error.toString() : 'An unexpected error occurred.'

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">{message}</h1>
        </div>
    )
}

export default Fallback
