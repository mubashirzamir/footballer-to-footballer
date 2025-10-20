// TODO: Structure and nest page wise
export const en = {
    messages: {
        nav: {
            hamburger: {
                home_button: 'Home',
                about_button: 'About',
                help_button: 'Help',
            },
            mode_toggle: {
                light: 'Light',
                dark: 'Dark',
                system: 'System',
            },
        },
        home: {
            start: 'Start',
            next_challenge: 'Next Challenge',
            show_help: 'Can you connect these two players?',
            show_help_link: 'Show me how.',
        },
        game: {
            unknown_game_phase: 'Unknown game phase',
            team_selection: {
                history_of: 'History of',
                no_teams: 'No teams to show',
            },
            player_selection: {
                no_players: 'No players to show',
            },
            win: {
                time: 'Time',
                distance: 'Distance',
                journey: 'Journey',
                shortest_possible: '→ Shortest possible:',
            },
        },
        help: {
            title: 'How to Play',
            text: 'Find the shortest connection between two players by linking them through clubs they’ve both played for, and then repeating this process with those clubs and their players.',
            example: 'For example to connect Messi to Ronaldo, the chain can be:',
            result: 'Resulting in a total distance of 2.',
        },
        about: {
            title: 'About',
            contact: 'Contact',
            email: 'zamir.mubashir.dev@gmail.com',
            disclaimer:
                'Disclaimer: This product uses data from {link} but is not endorsed or certified by Transfermarkt.',
            credits:
                'Credits: This product was heavily inspired by {link}. Definitely check it out as well if you enjoyed this game!',
        },
    },
    errors: {
        '404': 'Page not found',
        no_game_today: 'No Game for Today.',
        no_game_info: 'No game info in non-play route',
        missing_player_ids: 'Missing player IDs in URL parameters',
        same_player_ids: 'Start and end player IDs cannot be the same',
        error_for_user: 'An error occurred. Please try again later.',
        unknown_error: 'An unknown error occurred.',
    },
}
