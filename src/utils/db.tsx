type Game = {
    start_player_id: string
    start_player_name: string
    end_player_id: string
    end_player_name: string
}

export const games: Record<string, Game> = {
    '2025-10-14': {
        start_player_id: "abc",
        start_player_name: 'Fernando Torres',
        end_player_id: "def",
        end_player_name: 'Wayne Rooney',
    },
    '2025-10-13': {
        start_player_id: "abc",
        start_player_name: 'Fernando Torres',
        end_player_id: "def",
        end_player_name: 'Wayne Rooney',
    },
}
