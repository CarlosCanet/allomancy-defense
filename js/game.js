import { GameIdle } from "./gameIdle.js";
import { GameIncursion } from "./gameIncursion.js";
import { HouseVenture } from "./houses.js";
export var gameStates;
(function (gameStates) {
    gameStates[gameStates["WaitingToStart"] = 0] = "WaitingToStart";
    gameStates[gameStates["BaseBuilding"] = 1] = "BaseBuilding";
    gameStates[gameStates["Incursioning"] = 2] = "Incursioning";
    gameStates[gameStates["GameOver"] = 3] = "GameOver";
})(gameStates || (gameStates = {}));
export const METALS_RESOURCES = { STEEL: "Steel", BRONZE: "Bronze", COPPER: "Copper", TIN: "Tin" };
export const OTHER_RESOURCES = { COINS: "Coins" };
export const ALL_RESOURCES = { ...METALS_RESOURCES, ...OTHER_RESOURCES };
// export const RESOURCES = [...Object.values(METALS_RESOURCES), ...Object.values(OTHER_RESOURCES)];
export const RESOURCES = [...Object.values(ALL_RESOURCES)];
export const HOUSES = ["Venture", "Cett", "Lekal", "Hastings", "Elariel"];
export class Game {
    // ATTRIBUTES
    state;
    screenNodes;
    gameFrequency;
    tick;
    gameIntervalId;
    gameIdle;
    gameIncursion;
    // METHODS
    constructor(screens) {
        this.state = gameStates.WaitingToStart;
        this.screenNodes = screens;
        this.gameFrequency = Math.floor(1000 / 60);
        this.tick = 0;
        this.gameIntervalId = 0;
        this.showStartScreen();
        this.gameIdle = new GameIdle(this.screenNodes.baseGameBoxNode, this.gameFrequency);
        this.gameIncursion = new GameIncursion(this.screenNodes.incursionGameBoxNode, this.gameFrequency, this.gameIdle.resources);
    }
    startGame = () => {
        this.gameIdle.createBaseUI();
        this.showBaseScreen();
        this.gameIntervalId = setInterval(this.gameLoop, this.gameFrequency);
    };
    startIncursion = () => {
        this.gameIncursion.createIncursionUI();
        this.showIncursionScreen();
    };
    showStartScreen = () => {
        this.screenNodes.startScreenNode.style.display = "flex";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    };
    showBaseScreen = () => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "flex";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    };
    showIncursionScreen = () => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "flex";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    };
    showGameOver = () => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "flex";
    };
    gameLoop = () => {
        this.tick++;
        // console.log(this);
        // Every building produce resource
        this.gameIdle.gameLoop(this.tick);
        // this.gameIdle.gameLoop(this.tick);
    };
    gameOver = () => {
    };
}
