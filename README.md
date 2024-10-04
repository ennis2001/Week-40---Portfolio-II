# Week-40---Portfolio-II

# Changes and Additions

## game.mjs
+ Refactored Code Structure: Improved readability and maintainability by organizing game logic into distinct functions.
  + `start`: Initializes the game and displays the main menu.
  + `runGame`: Manages the game loop and player turns.
  + `playGame`: Handles the game state and evaluates the  outcome.
  + `evaluateGameState`: Checks for wins, draws, and updates  the game status.
+ Player vs Computer Mode: Implemented a new mode for playing against the computer, including a simple AI that makes random moves.
+ Game Board Initialization: Enhanced the initialization of the game board for improved symmetry and visual appeal.
+ Improved Game Summary: Enhanced feedback at the end of the game to indicate whether the player won, lost, or drew, along with the computer's performance in PvC mode.

## ansi.mjs ##
+ ANSI Color Codes: Utilized ANSI color codes to enhance user feedback with colored text for player symbols and game status (e.g., current player's turn, win/lose messages).

## splash.mjs ##
+ Splash Screen Implementation: Created a splash screen that displays game information and introduces the game before starting, enhancing user experience.

## io.mjs ##
+ Input and Output Handling: Centralized user input and output functions for better management of console interactions.
+ Improved User Prompts: Enhanced prompts and feedback to guide users through the game, including better instructions for inputs.

## language.mjs ##
+ Multi-language Support: Added support for multiple languages, enhancing accessibility for diverse players.
Included languages:
  + Norwegian
  + German
  + French
  + Spanish
  + Korean
  + Japanese

## README.md (This File)
+ Documentation: Compiled detailed documentation on changes, additions, and improvements made to the original implementation, providing clarity on the modifications and enhancements to the game.
