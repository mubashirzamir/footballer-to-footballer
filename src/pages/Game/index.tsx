import TeamSelection from './TeamSelection.tsx'
import { useEffect, useState } from 'react'
import Win from './Win.tsx'
import PlayerSelection from './PlayerSelection.tsx'
import GameSummary from '@/pages/Game/GameSummary.tsx'
import { type Player } from '@/hooks/useGameInfo.tsx'
import Path from '@/pages/Game/Path.tsx'
import useGameInfoFromLocation from '@/hooks/useGameFromLocation.tsx'

export type Team = {
    id: string
    name: string
    startDate: string
    endDate: string
    imageUrl: string
}

type Stackable = {
    type: 'team' | 'player'
} & (Team | Player)

export type GameState = Stackable[]

const GamePhase = {
    PlayerSelection: 'PLAYER_SELECTION',
    TeamSelection: 'TEAM_SELECTION',
    Won: 'WON',
}

const Game = () => {
    const gameInfo = useGameInfoFromLocation()
    const [gameState, setGameState] = useState<GameState>([{ type: 'player', ...gameInfo.startPlayer }])

    // TODO: This causes lots of re-rendering, find a better way to initialize state from props
    useEffect(() => {
        console.error('mushi Game', gameInfo)
        setGameState([{ type: 'player', ...gameInfo.startPlayer }])
    }, [gameInfo])

    const phase =
        gameState[gameState.length - 1].type === 'player' ? GamePhase.TeamSelection : GamePhase.PlayerSelection

    const teamSetter = (team: Team) => {
        setGameState((state) => [...state, { type: 'team', ...team }])
    }

    const playerSetter = (player: Player) => {
        setGameState((state) => [...state, { type: 'player', ...player }])
    }

    useEffect(() => {
        validator(gameState)
    }, [gameState])

    const render = () => {
        switch (phase) {
            case GamePhase.TeamSelection:
                return <TeamSelection player={gameState[gameState.length - 1]} setTeam={teamSetter} />
            case GamePhase.PlayerSelection:
                // @TODO: Find a better way to handle this
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return <PlayerSelection team={gameState[gameState.length - 1]} setPlayer={playerSetter} />
            case GamePhase.Won:
                return <Win />
            default:
                return <div>Unknown game phase</div>
        }
    }

    return (
        <div className="p-8">
            <div>
                <GameSummary gameInfo={gameInfo} />
            </div>
            <div className="my-4">
                <Path gameState={gameState} />
            </div>
            <div>{render()}</div>
        </div>
    )
}

// Avoid circles
// Set limits
// Check win condition
const validator = (state: GameState) => {
    // console.log(state)
}

export default Game
