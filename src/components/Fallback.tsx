import { __ } from '@/lang/lang.ts'
import { ENV_IS_DEV } from '@/utils/constants.ts'

// @ts-ignore // TODO
const Fallback = ({ error }) => {
    const message = ENV_IS_DEV ? error.toString() : __.errors.unknown_error

    console.log('F2F: Fallback component caught an error:', error)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">{message}</h1>
        </div>
    )
}

export default Fallback
