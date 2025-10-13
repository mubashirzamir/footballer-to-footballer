import TeamSelection from './TeamSelection.tsx'
import { useEffect, useState } from 'react'
import Win from './Win.tsx'
import PlayerSelection from './PlayerSelection.tsx'
import Path from '@/pages/Game/Path.tsx'
import GameSummary from '@/pages/Game/GameSummary.tsx'

export type GameState = {
    phase: string // make this stricter
}

const GamePhase = {
    PlayerSelection: 'PLAYER_SELECTION',
    TeamSelection: 'TEAM_SELECTION',
    Connected: 'CONNECTED',
}

const Game = () => {
    const [state, setState] = useState<GameState>({
        phase: GamePhase.TeamSelection,
    }) // track player and team selections with time period

    const [player, setPlayer] = useState<string>('Initial Player') // set initial and handle initial
    const [team, setTeam] = useState<string>('Initial Team')

    const teamSetter = (teamId: string) => {
        setTeam(teamId)
        setState((state) => ({ ...state, phase: GamePhase.PlayerSelection }))
    }

    const playerSetter = (playerId: string) => {
        setPlayer(playerId)
        setState((state) => ({ ...state, phase: GamePhase.TeamSelection }))
        validator(state)
    }

    useEffect(() => {}, [])

    const render = () => {
        switch (state.phase) {
            case GamePhase.TeamSelection:
                return <TeamSelection player={player} setTeam={teamSetter} />
            case GamePhase.PlayerSelection:
                return <PlayerSelection team={team} setPlayer={playerSetter} />
            case GamePhase.Connected:
                return <Win />
            default:
                return <div>Unknown game phase</div>
        }
    }

    return (
        <div>
            <GameSummary />
            <hr className="my-4" />
            <Path state={state} />
            <hr className="my-4" />
            {render()}
        </div>
    )
}

// Avoid circles
// Set limits
const validator = (state: GameState) => {
    console.log(state)
}

export default Game
