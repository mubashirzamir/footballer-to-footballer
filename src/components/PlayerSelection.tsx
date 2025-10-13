interface PlayerSelectionProps {
    team: string
    setPlayer: (playerId: string) => void
}

const PlayerSelection = (props: PlayerSelectionProps) => {
    const { team, setPlayer } = props

    console.log(team)

    const onPlayerSelect = () => {
        setPlayer('xyz')
    }

    return (
        <div>
            <Search />
            <ul>
                <li>
                    <button onClick={onPlayerSelect}>Fernando Torres</button>
                </li>
            </ul>
        </div>
    )
}

const Search = () => {
    return <input name="search"/>
}

export default PlayerSelection
