import { ENV_IS_DEV } from '@/utils/constants.ts'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'
import { Logger } from '@/utils'

interface ErrorProps {
    error: unknown
}

const Error = ({ error }: ErrorProps) => {
    let message = <>{__.errors.error_for_user}</>

    if (ENV_IS_DEV) {
        // @ts-ignore
        message = <>{error?.message || String(error) || __.errors.unknown_error}</>
    }

    Logger.log('Error: ', error)

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="p-4 bg-red-100 text-red-800 border border-red-400 rounded">
                <Text className="block sm:inline ml-2">{message}</Text>
            </div>
        </div>
    )
}

export default Error
