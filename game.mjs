import { print, askQuestion } from "./io.mjs";
import { debug, DEBUG_LEVELS } from "./debug.mjs";
import { ANSI } from "./ansi.mjs";
import DICTIONARY from "./language.mjs";
import showSplashScreen from "./splash.mjs";

// Constants for game settings
const GAME_BOARD_SIZE = 3;
const PLAYER_1 = 1; // Human player
const PLAYER_2 = -1; // Computer player

// Player symbols
const SYMBOL_PLAYER_1 = "X";
const SYMBOL_PLAYER_2 = "O";
const EMPTY_CELL_SYMBOL = "_";

// Outcome values
const OUTCOME_DRAW = -2;
const OUTCOME_WIN = 3;

// Menu choices
const MENU_CHOICE_PLAY_PVP = 1;
const MENU_CHOICE_PLAY_PVC = 2; // New option for Player vs Computer
const MENU_CHOICE_SETTINGS = 3;
const MENU_CHOICE_EXIT = 4;
const NO_CHOICE = -1;

// Column and row labels
const COLUMNS = ['A', 'B', 'C'];
const ROWS = ['1', '2', '3'];

let language = DICTIONARY.en;
let gameboard;
let currentPlayer;

// Show splash screen and delay before starting menu
clearScreen();
await showSplashScreen(); // Call the updated splash screen

// Start the game after the splash screen
start();

//#region game functions -----------------------------

async function start() {
    do {
        let chosenAction = NO_CHOICE;
        chosenAction = await showMenu();

        if (chosenAction === MENU_CHOICE_PLAY_PVP) {
            await runGame(PLAYER_1, PLAYER_2);
        } else if (chosenAction === MENU_CHOICE_PLAY_PVC) {
            await runGame(PLAYER_1, PLAYER_2, true); // Pass true for PvC mode
        } else if (chosenAction === MENU_CHOICE_SETTINGS) {
            await showSettingsMenu();
        } else if (chosenAction === MENU_CHOICE_EXIT) {
            clearScreen();
            process.exit();
        }
    } while (true);
}

async function runGame(player1, player2, isPvC = false) {
    let isPlaying = true;

    while (isPlaying) {
        initializeGame();
        isPlaying = await playGame(player1, player2, isPvC);
    }
}

async function showMenu() {
    let choice = NO_CHOICE;
    let validChoice = false;

    while (!validChoice) {
        clearScreen();
        print(ANSI.COLOR.YELLOW + "MENU" + ANSI.RESET);
        print(`${MENU_CHOICE_PLAY_PVP}. ${language.PLAY_GAME} (PvP)`);
        print(`${MENU_CHOICE_PLAY_PVC}. ${language.PLAY_GAME} (PvC)`); // New menu option
        print(`${MENU_CHOICE_SETTINGS}. ${language.SETTINGS}`);
        print(`${MENU_CHOICE_EXIT}. ${language.EXIT_GAME}`);

        const input = await askQuestion("");
        const numChoice = Number(input);

        if ([MENU_CHOICE_PLAY_PVP, MENU_CHOICE_PLAY_PVC, MENU_CHOICE_SETTINGS, MENU_CHOICE_EXIT].includes(numChoice)) {
            validChoice = true;
            return numChoice;
        }
    }
}

// Language settings menu remains unchanged
async function showSettingsMenu() {
    let validChoice = false;

    while (!validChoice) {
        clearScreen();
        print(ANSI.COLOR.YELLOW + language.SETTINGS_MENU + ANSI.RESET);
        print("1. English");
        print("2. Norwegian");
        print("3. German");
        print("4. Spanish");
        print("5. French");
        print("6. Korean");
        print("7. Japanese");

        const choice = await askQuestion(language.CHOOSE_LANGUAGE);

        switch (choice) {
            case "1":
                language = DICTIONARY.en;
                validChoice = true;
                break;
            case "2":
                language = DICTIONARY.no;
                validChoice = true;
                break;
            case "3":
                language = DICTIONARY.de;
                validChoice = true;
                break;
            case "4":
                language = DICTIONARY.es;
                validChoice = true;
                break;
            case "5":
                language = DICTIONARY.fr;
                validChoice = true;
                break;
            case "6":
                language = DICTIONARY.ko;
                validChoice = true;
                break;
            case "7":
                language = DICTIONARY.jp;
                validChoice = true;
                break;
            default:
                print(language.INVALID_CHOICE);
        }
    }
}

async function playGame(player1, player2, isPvC) {
    let outcome;

    do {
        clearScreen();
        showGameBoardWithCurrentState();
        showHUD();

        const move = isPvC && currentPlayer === player2 ? await getComputerMove() : await getGameMoveFromCurrentPlayer();
        updateGameBoardState(move);
        outcome = evaluateGameState();
        changeCurrentPlayer();
    } while (outcome === 0);

    showGameSummary(outcome);
    return await askWantToPlayAgain();
}

async function getComputerMove() {
    let position;
    do {
        // Randomly pick a position
        const row = Math.floor(Math.random() * GAME_BOARD_SIZE);
        const col = Math.floor(Math.random() * GAME_BOARD_SIZE);
        position = [row, col];
    } while (!isValidPositionOnBoard(position));

    return position;
}

// The rest of your functions remain unchanged...

async function askWantToPlayAgain() {
    const answer = await askQuestion(language.PLAY_AGAIN_QUESTION);
    const confirmInputs = language.CONFIRM.map(input => input.toLowerCase());
    const denyInputs = language.DENY.map(input => input.toLowerCase());

    if (confirmInputs.includes(answer.toLowerCase())) {
        return true; // Player wants to play again
    } else if (denyInputs.includes(answer.toLowerCase())) {
        return false; // Player does not want to play again
    } else {
        print(language.INVALID_CHOICE);
        return await askWantToPlayAgain(); // Retry if invalid choice
    }
}

function showGameSummary(outcome, isPvC) {
    clearScreen();

    if (outcome === OUTCOME_DRAW) {
        print(language.DRAW);
    } else {
        const winningPlayer = outcome > 0 ? PLAYER_1 : PLAYER_2; // Determine the winner

        // Check if it's Player vs Computer or Player vs Player
        if (isPvC && winningPlayer === PLAYER_2) {
            print(language.COMPUTER_WIN); // Computer won
        } else {
            const winnerName = winningPlayer === PLAYER_1 ? language.PLAYER_1 : language.PLAYER_2;
            print(`${language.WINNER} ${winnerName}`);
        }
    }

    showGameBoardWithCurrentState();
    print(language.GAME_OVER);
}

function changeCurrentPlayer() {
    currentPlayer *= -1;
}

function evaluateGameState() {
    let sum = 0;
    let state = 0;

    // Check horizontal and vertical wins
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        // Check rows
        sum = gameboard[i].reduce((acc, val) => acc + val, 0);
        if (Math.abs(sum) === OUTCOME_WIN) state = sum;

        // Check columns
        sum = gameboard.reduce((acc, row) => acc + row[i], 0);
        if (Math.abs(sum) === OUTCOME_WIN) state = sum;
    }

    // Check diagonals
    sum = 0;
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        sum += gameboard[i][i];  // Main diagonal
    }
    if (Math.abs(sum) === OUTCOME_WIN) state = sum;

    sum = 0;
    for (let i = 0; i < GAME_BOARD_SIZE; i++) {
        sum += gameboard[i][GAME_BOARD_SIZE - 1 - i];  // Anti-diagonal
    }
    if (Math.abs(sum) === OUTCOME_WIN) state = sum;

    // Check for draw
    if (!gameboard.flat().includes(0) && state === 0) {
        return OUTCOME_DRAW;
    }

    return state / OUTCOME_WIN;
}

function updateGameBoardState(move) {
    const row = move[0];
    const col = move[1];
    gameboard[row][col] = currentPlayer;
}

async function getGameMoveFromCurrentPlayer() {
    let position;
    do {
        const rawInput = await askQuestion(language.PLACE_MARK);
        position = parseInputPosition(rawInput);
    } while (!isValidPositionOnBoard(position));

    return position;
}

function parseInputPosition(input) {
    const parts = input.trim().toUpperCase().split(" ");

    if (parts.length !== 2) return null;

    let row, col;

    if (COLUMNS.includes(parts[0])) {
        col = COLUMNS.indexOf(parts[0]);
        row = ROWS.indexOf(parts[1]);
    } else {
        col = COLUMNS.indexOf(parts[1]);
        row = ROWS.indexOf(parts[0]);
    }

    return [row, col];
}

function isValidPositionOnBoard(position) {
    if (!position || position.length < 2) return false;

    const [row, col] = position;

    return (
        row >= 0 && row < GAME_BOARD_SIZE &&
        col >= 0 && col < GAME_BOARD_SIZE &&
        gameboard[row][col] === 0
    );
}

const COLOR_PLAYER_1 = ANSI.COLOR.GREEN;
const COLOR_PLAYER_2 = ANSI.COLOR.RED;

function showHUD() {
    const playerSymbol = currentPlayer === PLAYER_1 ? SYMBOL_PLAYER_1 : SYMBOL_PLAYER_2;
    const playerColor = currentPlayer === PLAYER_1 ? COLOR_PLAYER_1 : COLOR_PLAYER_2;
    const playerDescription = currentPlayer === PLAYER_1 
        ? `${language.PLAYER_1} (${playerColor}${SYMBOL_PLAYER_1}${ANSI.RESET})` 
        : `${language.PLAYER_2} (${playerColor}${SYMBOL_PLAYER_2}${ANSI.RESET})`;
    print(`${playerDescription}, ${language.TURN}`);
}

function showGameBoardWithCurrentState() {
    // Print column labels (A, B, C) centered above the grid
    print("     A   B   C");
    
    // Print the top border after the column labels
    print("   +---+---+---+");

    for (let row = 0; row < GAME_BOARD_SIZE; row++) {
        // Print the row label (1, 2, 3) on the left side
        let rowOutput = ` ${ROWS[row]} `;  
        rowOutput += "|"; // Start the row with a separator

        for (let col = 0; col < GAME_BOARD_SIZE; col++) {
            const cell = gameboard[row][col];
            let cellSymbol = `   `; // Default empty cell symbol

            // Set the cell symbol based on the player's mark
            if (cell === PLAYER_1) {
                cellSymbol = ` ${COLOR_PLAYER_1}${SYMBOL_PLAYER_1}${ANSI.RESET} `;
            } else if (cell === PLAYER_2) {
                cellSymbol = ` ${COLOR_PLAYER_2}${SYMBOL_PLAYER_2}${ANSI.RESET} `;
            }

            // Add the cell content and separator
            rowOutput += `${cellSymbol}|`;
        }

        // Print the completed row
        print(rowOutput);

        // Print the separator line after each row
        print("   +---+---+---+");
    }
}

function initializeGame() {
    gameboard = Array(GAME_BOARD_SIZE).fill(null).map(() => Array(GAME_BOARD_SIZE).fill(0));
    currentPlayer = PLAYER_1;
}

function clearScreen() {
    console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME, ANSI.RESET);
}

//#endregion
