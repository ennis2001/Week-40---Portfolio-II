# Tic-Tac-Toe Game

## Overview
Tic-Tac-Toe is a classic two-player game where players take turns marking a square on a 3x3 grid with their respective symbols (X or O). The first player to align three of their symbols horizontally, vertically, or diagonally wins the game!

## Objective
The objective of the game is to be the first player to align three of your symbols (X or O) in a row, either horizontally, vertically, or diagonally.

## How to Play
### Start the Game:
When you run the game, you will have the option to play against another player (PvP) or against the computer (PvC).

### Make Your Moves:
- Players will alternate turns to place their symbol in an empty square.
- To place your symbol, input the column and row coordinates (e.g., A 1, B 2, C 3).

### Visual Feedback:
- The game displays the current state of the board after each move.
- The current player's turn is indicated on the screen.

## Game Mechanics
- The game is played on a 3x3 grid, with each cell marked as empty  initially.
- Players can place their symbols in any empty cell.
- The game ends when one player aligns three symbols in a row or all cells are filled (resulting in a draw).

## Winning and Losing
- You win the game by aligning three of your symbols in a row.
  If the board fills up without any player winning, the game ends in a draw.

## Controls
- Input the coordinates of your move using column letters (A, B, C)  and row numbers (1, 2, 3).
- Follow the prompts to continue playing or see your game stats.

## Tips for Players
- Start by placing your symbol in the center square for a strategic advantage.
- Keep an eye on your opponent's moves to block their chances of winning.

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
+ ANSI Color Codes: Utilized ANSI colour codes to enhance user feedback with coloured text for player symbols and game status (e.g., current player's turn, win/lose messages).

## splash.mjs ##
+ Splash Screen Implementation: Created a splash screen that displays game information and introduces the game before starting, enhancing user experience.

## io.mjs ##
+ Input and Output Handling: Centralized user input and output functions for better management of console interactions.
+ Improved User Prompts: Enhanced prompts and feedback to guide users through the game, including better instructions for inputs.

## language.mjs ##
+ Multi-language Support: Added support for multiple languages, enhancing accessibility for diverse players.
Included languages:
  + `Norwegian`
  + `German`
  + `French`
  + `Spanish`
  + `Korean`
  + `Japanese`

## README.md ##
+ Documentation: Compiled detailed documentation on changes, additions, and improvements made to the original implementation,
+ Game Mechanics Overview: Included a rundown for the game mechanics and instructions on how to play the game, ensuring users have clear guidance on gameplay.