# Contribution Guide

This is my quick and dirty solution right now to support game contributions.

## How to Contribute

Add a new object in the GAMES object in db.tsx in this folder.
    - key: date in YYYY-MM-DD format
    - value: object with the following properties:
        - start_player_id: string - The transfermarkt player ID of the starting player
        - start_player_name: string - The name of the starting player
        - end_player_id: string - The transfermarkt player ID of the ending player
        - end_player_name: string - The name of the ending player
        - contributor: string - Your name or handle
    - Note: The transfermarkt player ID can be found in the URL of the player's profile on transfermarkt.com