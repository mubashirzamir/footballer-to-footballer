// TODO: Find a better icon
import WinCard from '@/pages/Game/Win/WinCard.tsx'

const ShortestPossible = () => {
    return (
        <WinCard>
            <details className="w-full">
                <summary className="flex items-center justify-center text-xl cursor-pointer py-2 text-center">
                    🔎 Shortest possible: 2
                </summary>
                <div className="text-lg mt-2 min-h-[2.5rem]">Player A → Team X → Player B → Team Y → Player C</div>
            </details>
        </WinCard>
    )
}

export default ShortestPossible
