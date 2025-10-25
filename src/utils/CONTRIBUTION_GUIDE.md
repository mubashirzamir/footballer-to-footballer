# Contribution Guide

This is my quick and dirty solution right now to support game contributions. In the future, I am planning on adding
tests to ensure that the games are not duplicates. I also have a TODO.md in the root of the repo with some other stuff
which I would not mind help with.

## How to Contribute

- Add a new object in the GAMES object in db.tsx in this folder.
    - key: date in YYYY-MM-DD format
    - value: object with the following properties:
        - start_player_id: string - The transfermarkt player ID of the starting player
        - start_player_name: string - The name of the starting player
        - end_player_id: string - The transfermarkt player ID of the ending player
        - end_player_name: string - The name of the ending player
        - contributor: string - Your name or handle
    - Note: The transfermarkt player ID can be found in the URL of the player's profile on transfermarkt.com