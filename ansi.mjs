const ESC = '\x1b';
const CSI = ESC + '[';
const CURSOR_UP = CSI + 'A';
const CURSOR_DOWN = CSI + 'B';
const CURSOR_RIGHT = CSI + 'C';
const CURSOR_LEFT = CSI + 'D';
const CLEAR_SCREEN = CSI + '2J';
const CURSOR_HOME = CSI + '1;1H';
const SAVE_CURSOR = ESC + '7';
const RESTORE_CURSOR = ESC + '8';
const moveCursorTo = (row, col) => CSI + row + ';' + col + 'H';
const BELL = '\x07';
const RESET = CSI + '0m';  // Reset all attributes to default

// Define color codes
const GREEN = CSI + '32m';
const RED = CSI + '31m';
const YELLOW = CSI + '33m';
const BLUE = CSI + '34m';
const CYAN = CSI + '36m'; // Added Cyan
const MAGENTA = CSI + '35m'; // Added Magenta

// ANSI object with all attributes and colors
const ANSI = {
    ESC,
    CSI,
    CURSOR_UP,
    CURSOR_DOWN,
    CURSOR_RIGHT,
    CURSOR_LEFT,
    CLEAR_SCREEN,
    CURSOR_HOME,
    SAVE_CURSOR,
    RESTORE_CURSOR,
    BELL,
    RESET,
    moveCursorTo,
    COLOR: {
        GREEN,
        RED,
        YELLOW,
        BLUE,
        CYAN,    // Include Cyan in COLOR object
        MAGENTA  // Include Magenta in COLOR object
    }
};

export { ANSI };
