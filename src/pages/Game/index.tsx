import { useEffect } from 'react'
import GameSummary from '@/pages/Game/GameSummary.tsx'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'
import BaseSpinner from '@/components/BaseSpinner.tsx'
import { Team } from '@/structures/Team.ts'
import { type GameState } from '@/structures'
import { Player } from '@/structures/Player.ts'
import useGameState from '@/hooks/useGameState.tsx'
import Win from '@/pages/Game/Win/index.tsx'
import useGameTimer from '@/hooks/useGameTimer.tsx'
import Timer from '@/pages/Game/Timer.tsx'
import TeamSelection from '@/pages/Game/TeamSelection/index.tsx'
import PlayerSelection from '@/pages/Game/PlayerSelection/index.tsx'
import Path from '@/pages/Game/Path/index.tsx'

const Game = () => {
    const { gameInfo, loading: gameInfoLoading } = useGameInfoFromLocation()
    const { gameState, setGameState, append, chop } = useGameState([gameInfo.startPlayer])
    const { time, timeTaken, buzzer } = useGameTimer()

    // Unnecessary complexity.
    // Works fine stand alone, but when game state is changed from path, we cannot keep the
    // useGameNavigation(gameState, pop)

    const tail = gameState[gameState.length - 1]
    const gameOver = tail.id === gameInfo.endPlayer.id
    if (gameOver && timeTaken === 0) buzzer()

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
            {!gameOver && <Timer time={time} />}
            <div>
                <GameSummary gameInfo={gameInfo} />
            </div>
            {gameOver ? (
                <div className="my-4">
                    <Win timeTaken={timeTaken} gameState={gameState} />
                </div>
            ) : (
                <>
                    <div className="my-4">
                        <Path chopGameState={chop} gameState={gameState} />
                    </div>
                    {render()}
                </>
            )}
        </div>
    )
}

// TODO: Avoid circles, set limits, check win condition
const validator = (state: GameState) => {
    console.log('validator', state)
}

export default Game
