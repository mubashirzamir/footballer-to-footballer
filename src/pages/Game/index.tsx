import TeamSelection from './TeamSelection.tsx'
import { useEffect, useState } from 'react'
import Win from './Win.tsx'
import PlayerSelection from './PlayerSelection.tsx'
import GameSummary from '@/pages/Game/GameSummary.tsx'
import Path from '@/pages/Game/Path.tsx'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import { Team } from '@/structures/Team.ts'
import { type GameState } from '@/structures'
import { Player } from '@/structures/Player.ts'
import type { Playable } from '@/structures/Playable.ts'

const Game = () => {
    const { gameInfo, loading: gameInfoLoading } = useGameInfoFromLocation()
    const [gameState, setGameState] = useState<GameState>([gameInfo.startPlayer])

    const tail = gameState[gameState.length - 1]

    // TODO: This causes lots of re-rendering, find a better way to initialize state from props
    useEffect(() => {
        setGameState([gameInfo.startPlayer])
    }, [gameInfo])

    useEffect(() => {
        validator(gameState)
    }, [gameState])

    const updateGameState = (playable: Playable) => {
        setGameState((state) => [...state, playable])
    }

    const chopGameState = (index: number) => {
        setGameState((state) => state.slice(0, index + 1))
    }

    const render = () => {
        switch (true) {
            case tail.id === gameInfo.endPlayer.id:
                return <Win />
            case tail instanceof Player:
                return <TeamSelection player={tail} updateGameState={updateGameState} />
            case tail instanceof Team:
                return <PlayerSelection team={tail} updateGameState={updateGameState} />
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
                <Path chopGameState={chopGameState} gameState={gameState} />
            </div>
            <div>{render()}</div>
        </div>
    )
}

// Avoid circles
// Set limits
// Check win condition
const validator = (state: GameState) => {
    console.log('validator', state)
}

export default Game
