interface PlayerHistoryProps {
    player: string
    setTeam: (teamId: string) => void
}

const TeamSelection = (props: PlayerHistoryProps) => {
    const { player, setTeam } = props

    console.log(player)

    const onTeamSelect = () => {
        setTeam('abc')
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Club</th>
                    </tr>
                    <tr>
                        <td>22 September 2022</td>
                        <td>25 September 2025</td>
                        <td><span onClick={onTeamSelect}>Manchester United</span></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={onTeamSelect}>Manchester United</button>
        </div>
    )
}

export default TeamSelection
