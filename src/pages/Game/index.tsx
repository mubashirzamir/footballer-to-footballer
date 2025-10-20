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
import useGameNavigation from '@/hooks/useGameNavigation.tsx'
import { useEffect } from 'react'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'

const Game = () => {
    const { gameInfo, infoHealth } = useGameInfoFromLocation()
    const { gameState, setGameState, append, chop, pop } = useGameState([gameInfo.startPlayer])
    const { time, timeTaken, buzzer } = useGameTimer()
    useGameNavigation(gameState, pop)

    // Updates the game state to have the hydrated version of the start player.
    useEffect(() => {
        setGameState((state) => {
            const first = state[0]
            const start = gameInfo.startPlayer

            if (first.id !== start.id) return state
            if (first.name === start.name && first.imageUrl === start.imageUrl) return state

            return [start, ...state.slice(1)]
        })
    }, [gameInfo.startPlayer, setGameState])

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
                return <Text>{__.messages.game.unknown_game_phase}</Text>
        }
    }

    if (infoHealth.startPlayer.loading || infoHealth.endPlayer.loading) {
        return <BaseSpinner className="size-12" />
    }

    // TODO: Too many and too confusion conditions, pull them to separate components and pull conditions from gamestate
    return (
        <div className="p-4 md:p-8">
            {!gameOver && (
                <div className="mx-auto w-fit">
                    <Timer time={time} />
                </div>
            )}
            <div>
                <GameSummary gameInfo={gameInfo} />
            </div>
            <div className="my-4">
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
