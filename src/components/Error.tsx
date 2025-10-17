import type { ReactNode } from 'react'
import { ENV_IS_DEV } from '@/utils/constants.ts'
import Text from '@/components/Text.tsx'

interface ErrorProps {
    error: unknown
}

const Error = ({ error }: ErrorProps) => {
    let message: ReactNode = (
        // @ts-ignore // TODO
        <span className="whitespace-pre-wrap">{error?.message || String(error) || 'An unknown error occurred'}</span>
    )

    if (!ENV_IS_DEV) message = 'An error occurred. Please try again later.'

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="p-4 bg-red-100 text-red-800 border border-red-400 rounded">
                <Text className="block sm:inline ml-2">
                    {message}
                </Text>
            </div>
        </div>
    )
}

export default Error
