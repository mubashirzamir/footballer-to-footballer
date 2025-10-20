import { __ } from '@/lang/lang.ts'
import Text from '@/components/Text.tsx'
import { GAME_STATE } from '@/services/mock/mock.ts'
import Journey from '@/pages/Game/Win/Journey.tsx'

const Help = () => {
    return (
        <div className="flex flex-col min-h-screen gap-4 p-4 md:p-8">
            <Text className="text-start text-3xl">{__.messages.help.title}</Text>
            <Text className="text-start">{__.messages.help.text}</Text>
            <Text className="text-start">{__.messages.help.example}</Text>
            <div className="p-4">
                <Journey gameState={GAME_STATE()} />
                <Text className="text-start font-bold mt-4">{__.messages.help.result}</Text>
            </div>
        </div>
    )
}

export default Help
