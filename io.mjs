import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

function print(text) {
    console.log(text);
}

// Function to clear the console screen
function clearScreen() {
    console.clear();
}

export { print, askQuestion, clearScreen }; // Export clearScreen
