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
import useGameNavigation from '@/hooks/useGameNavigation.tsx'
import { useGameStateContext } from '@/contexts-providers/game-state/useGameStateContext.tsx'
import { useGameInfoContext } from '@/contexts-providers/game-info/useGameInfoContext.tsx'
import ContextsProviders from '@/contexts-providers'

const Main = () => {
    const { gameState, setGameState, chop, tail, gameOver } = useGameStateContext()
    useGameNavigation(gameState, chop)

    const { gameInfo, infoHealth } = useGameInfoContext()

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

const Game = () => {
    return (
        <ContextsProviders>
            <Main />
        </ContextsProviders>
    )
}

export default Game
