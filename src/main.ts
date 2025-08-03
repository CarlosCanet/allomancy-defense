import { Game, type Screens } from "./game.js";
// ** GLOBAL DOM ELEMENTS ** //
// Screens
const startScreenNode = document.querySelector("#start-screen") as HTMLDivElement;
const baseGameScreenNode = document.querySelector("#game-base-screen") as HTMLDivElement;
const incursionGameScreenNode = document.querySelector("#game-incursion-screen") as HTMLDivElement;
const gameOverScreenNode = document.querySelector("#game-over-screen") as HTMLDivElement;
const baseGameBox = document.querySelector("#base-game-box") as HTMLDivElement;
const incursionGameBox = document.querySelector("#incursion-game-box") as HTMLDivElement;
const gameScreens: Screens = {
    startScreenNode: startScreenNode,
    gameDefenseScreenNode: baseGameScreenNode,
    baseGameBoxNode: baseGameBox,
    gameIncursionScreenNode: incursionGameScreenNode,
    incursionGameBoxNode: incursionGameBox,
    gameOverScreenNode: gameOverScreenNode,
};
// Buttons
const startBtnNode = document.querySelector("#start-btn");
// Other things

// ** GLOBAL GAME VARIABLES ** //
const allomancyGame = new Game(gameScreens);
allomancyGame.startGame();

// ** GLOBAL GAME FUNCTIONS ** //

// ** EVENT LISTENERS ** //
