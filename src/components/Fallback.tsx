import { __ } from '@/lang/lang.ts'
import { ENV_IS_DEV } from '@/utils/constants.ts'

const Fallback = ({ error }: { error: unknown }) => {
    let message = __.errors.unknown_error

    if (ENV_IS_DEV) {
        message = error instanceof Error ? error.message : String(error)
    }

    console.log('F2F: Fallback component caught an error:', error)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">{message}</h1>
        </div>
    )
}

export default Fallback
