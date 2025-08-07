import { AllomancyDefenseGame } from "./allomancyDefenseGame.js";
// ** GLOBAL DOM ELEMENTS ** //
// Screens
const startScreenNode = document.querySelector("#start-screen");
const baseGameScreenNode = document.querySelector("#game-base-screen");
const incursionGameScreenNode = document.querySelector("#game-incursion-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const baseGameBox = document.querySelector("#base-game-box");
const incursionGameBox = document.querySelector("#incursion-game-box");
const gameScreens = {
    startScreenNode: startScreenNode,
    gameDefenseScreenNode: baseGameScreenNode,
    baseGameBoxNode: baseGameBox,
    gameIncursionScreenNode: incursionGameScreenNode,
    incursionGameBoxNode: incursionGameBox,
    gameOverScreenNode: gameOverScreenNode,
};
// Buttons
// Other things
// ** GLOBAL GAME VARIABLES ** //
const allomancyGame = new AllomancyDefenseGame(gameScreens);
// allomancyGame.gameOver();
// allomancyGame.startGame();
// allomancyGame.startIncursion();
// ** GLOBAL GAME FUNCTIONS ** //
// ** EVENT LISTENERS ** //
