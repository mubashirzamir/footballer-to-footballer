import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Text className="text-2xl font-bold mb-4">
                {__.errors["404"]}
            </Text>
        </div>
    )
}

export default NotFound
