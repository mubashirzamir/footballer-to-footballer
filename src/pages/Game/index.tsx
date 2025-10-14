import TeamSelection from './TeamSelection.tsx'
import { useEffect } from 'react'
import Win from './Win.tsx'
import PlayerSelection from './PlayerSelection.tsx'
import GameSummary from '@/pages/Game/GameSummary.tsx'
import Path from '@/pages/Game/Path.tsx'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import { Team } from '@/structures/Team.ts'
import { type GameState } from '@/structures'
import { Player } from '@/structures/Player.ts'
import useGameNavigation from '@/hooks/useGameNavigation.tsx'
import useGameState from '@/hooks/useGameState.tsx'

const Game = () => {
    const { gameInfo, loading: gameInfoLoading } = useGameInfoFromLocation()
    const { gameState, setGameState, pop, append, chop } = useGameState([gameInfo.startPlayer])
    useGameNavigation(gameState, pop)

    const tail = gameState[gameState.length - 1]
    const gameOver = tail.id === gameInfo.endPlayer.id

    // TODO: This causes lots of re-rendering, find a better way to initialize state from props
    // If gameInfo changes (e.g. changing the direction), reset the game state.
    useEffect(() => {
        setGameState([gameInfo.startPlayer])
    }, [gameInfo, setGameState])

    useEffect(() => {
        validator(gameState)
    }, [gameState])

    const render = () => {
        switch (true) {
            case gameOver:
                return <Win />
            case tail instanceof Player:
                return <TeamSelection player={tail} updateGameState={append} />
            case tail instanceof Team:
                return <PlayerSelection team={tail} updateGameState={append} />
            default:
                return <div>Unknown game phase</div>
        }
    }

    if (gameInfoLoading) {
        return <BaseSpinner className="size-12" />
    }

    return (
        <div className="p-8">
            <div>
                <GameSummary gameInfo={gameInfo} />
            </div>
            <div className="my-4">
                <Path chopGameState={chop} gameState={gameState} />
            </div>
            <div>{render()}</div>
        </div>
    )
}

// TODO: Avoid circles, set limits, check win condition
const validator = (state: GameState) => {
    console.log('validator', state)
}

export default Game
