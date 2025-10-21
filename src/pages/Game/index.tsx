import GameSummary from '@/pages/Game/GameSummary.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import { Team } from '@/structures/Team.ts'
import { Player } from '@/structures/Player.ts'
import Win from '@/pages/Game/Win/index.tsx'
import Timer from '@/pages/Game/Timer.tsx'
import TeamSelection from '@/pages/Game/TeamSelection/index.tsx'
import PlayerSelection from '@/pages/Game/PlayerSelection/index.tsx'
import Path from '@/pages/Game/Path/index.tsx'
import { useEffect } from 'react'
import Text from '@/components/Text.tsx'
import { __ } from '@/lang/lang.ts'
import { useGameContext } from '@/hooks/useGameContext.tsx'

const Game = () => {
    const { gameInfoContainer, gameStateContainer, gameTimerContainer } = useGameContext()

    const { gameInfo, infoHealth } = gameInfoContainer
    const { setGameState, tail, gameOver } = gameStateContainer

    // When the game direction is reversed, gameState still holds the first player while gameInfo has the new end player.
    // Since they will be the same we hit the game over condition, so we need to reset the timer.
    if (gameStateContainer.gameOver && gameTimerContainer.timeTaken === 0) gameTimerContainer.buzzer()

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

    const renderPlayableSelection = () => {
        switch (true) {
            case tail instanceof Player:
                return <TeamSelection player={tail} />
            case tail instanceof Team:
                return <PlayerSelection team={tail} />
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
                    <Timer />
                </div>
            )}
            <div>
                <GameSummary />
            </div>
            <div className="my-4">
                {gameOver ? (
                    <Win />
                ) : (
                    <>
                        <div className="mb-4">
                            <Path />
                        </div>
                        {renderPlayableSelection()}
                    </>
                )}
            </div>
        </div>
    )
}

export default Game
