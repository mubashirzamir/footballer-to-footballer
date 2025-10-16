import { useEffect } from 'react'
import GameSummary from '@/pages/Game/GameSummary.tsx'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import useGameState from '@/hooks/useGameState.tsx'
import Win from '@/pages/Game/Win/index.tsx'
import useGameTimer from '@/hooks/useGameTimer.tsx'
import Timer from '@/pages/Game/Timer.tsx'
import TeamSelection from '@/pages/Game/TeamSelection/index.tsx'
import PlayerSelection from '@/pages/Game/PlayerSelection/index.tsx'
import Path from '@/pages/Game/Path/index.tsx'

const Game = () => {
    const { gameInfo, infoHealth } = useGameInfoFromLocation()
    const { gameState, setGameState, append, chop } = useGameState([gameInfo.startPlayer])
    const { time, timeTaken, reset, buzzer } = useGameTimer()

    // TODO: This causes lots of re-rendering, find a better way to initialize state from props
    // If gameInfo changes (e.g. changing the direction), reset the game state and timer.
    // Do not include reset, it is breaking the timer.
    useEffect(() => {
        setGameState([gameInfo.startPlayer])
        reset()
    }, [gameInfo.startPlayer.id, gameInfo.endPlayer.id])

    // When the game direction is reversed, gameState still holds the first player while gameInfo has the new end player.
    // Since they will be the same we hit the game over condition, so we need to reset the timer.
    const tail = gameState[gameState.length - 1]
    const gameOver = tail.id === gameInfo.endPlayer.id
    if (gameOver && timeTaken === 0) buzzer()

    const render = () => {
        switch (true) {
            case tail instanceof Player:
                return <TeamSelection player={tail} updateGameState={append} />
            case tail instanceof Team:
                return <PlayerSelection team={tail} updateGameState={append} />
            default:
                return <div>Unknown game phase</div>
        }
    }

    if (infoHealth.startPlayer.loading || infoHealth.endPlayer.loading) {
        return <BaseSpinner className="size-12" />
    }

    return (
        <div className="p-8">
            {!gameOver && <Timer time={time} />}
            <div>
                <GameSummary gameInfo={gameInfo} />
            </div>
            <div className="my-8">
                {gameOver ? (
                    <Win timeTaken={timeTaken} gameState={gameState} />
                ) : (
                    <>
                        <div className="mb-4">
                            <Path gameState={gameState} chopGameState={chop} />
                        </div>
                        {render()}
                    </>
                )}
            </div>
        </div>
    )
}

export default Game
