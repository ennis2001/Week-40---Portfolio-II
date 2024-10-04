import { ANSI } from "./ansi.mjs"; // Import ANSI for colored output
import { print } from "./io.mjs"; // Import print function from io.mjs

const splashArt = `
${ANSI.COLOR.MAGENTA} ______  ____   __    ${ANSI.COLOR.CYAN}______   ____    __    ${ANSI.COLOR.YELLOW}______   ___     ___
${ANSI.COLOR.MAGENTA}|      ||    | /  ]  ${ANSI.COLOR.CYAN}|      | /    |  /  ]  ${ANSI.COLOR.YELLOW}|      | /   \\   /  _]
${ANSI.COLOR.MAGENTA}|      | |  | /  /   ${ANSI.COLOR.CYAN}|      ||  o  | /  /   ${ANSI.COLOR.YELLOW}|      ||     | /  [_ 
${ANSI.COLOR.MAGENTA}|_|  |_| |  |/  /    ${ANSI.COLOR.CYAN}|_|  |_||     |/  /    ${ANSI.COLOR.YELLOW}|_|  |_||  O  ||    _]
${ANSI.COLOR.MAGENTA}  |  |   |  /   \\_   ${ANSI.COLOR.CYAN}  |  |  |  _  /   \\_   ${ANSI.COLOR.YELLOW}  |  |  |     ||   [_ 
${ANSI.COLOR.MAGENTA}  |  |   |  \\     |  ${ANSI.COLOR.CYAN}  |  |  |  |  \\     |  ${ANSI.COLOR.YELLOW}  |  |  |     ||     |
${ANSI.COLOR.MAGENTA}  |__|  |____\\____|  ${ANSI.COLOR.CYAN}  |__|  |__|__|\\____|  ${ANSI.COLOR.YELLOW}  |__|   \\___/ |_____|
${ANSI.RESET}`;




async function showSplashScreen() {
  console.clear(); // Clear the console

  // Output the ASCII art
  print(`${ANSI.COLOR.CYAN}${splashArt}${ANSI.RESET}`);

  // Splash screen content with colors
  print(`${ANSI.COLOR.BLUE}Welcome to Tic-Tac-Toe!${ANSI.RESET}`);
  print(`${ANSI.COLOR.GREEN}Get ready to play!${ANSI.RESET}`);
  print(`${ANSI.COLOR.YELLOW}May the best player win!${ANSI.RESET}`);

  // Add delay so the player can see the splash screen for 4.5 seconds
  await new Promise(resolve => setTimeout(resolve, 4500));
}

// Export the function to be used in your main game file
export default showSplashScreen;

