export var gameStates;
(function (gameStates) {
    gameStates[gameStates["WaitingToStart"] = 0] = "WaitingToStart";
    gameStates[gameStates["BaseBuilding"] = 1] = "BaseBuilding";
    gameStates[gameStates["Incursioning"] = 2] = "Incursioning";
    gameStates[gameStates["GameOver"] = 3] = "GameOver";
})(gameStates || (gameStates = {}));
export const METALS_RESOURCES = ["Steel", "Bronze", "Copper", "Tin"];
export const OTHER_RESOURCES = ["Coins"];
export const RESOURCES = [...METALS_RESOURCES, ...OTHER_RESOURCES];
export class Game {
    // ATTRIBUTES
    state;
    screenNodes;
    resourcesDisplayNodes;
    buildingButtonNodes;
    alliesButtonNodes;
    resources;
    gameFrequency;
    tick;
    gameIntervalId;
    // METHODS
    constructor(screens) {
        this.state = gameStates.WaitingToStart;
        this.screenNodes = screens;
        // TODO
        this.resourcesDisplayNodes = [document.createElement("div")];
        this.buildingButtonNodes = [document.createElement("div")];
        this.alliesButtonNodes = [document.createElement("div")];
        this.resources = new Map;
        this.gameFrequency = Math.floor(1000 / 60);
        this.tick = 0;
        this.gameIntervalId = 0;
    }
    startGame() {
        this.showBaseScreen();
        this.gameIntervalId = setInterval(this.gameLoop, this.gameFrequency);
    }
    showStartScreen() {
        this.screenNodes.startScreenNode.style.display = "flex";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    }
    showBaseScreen() {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "flex";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    }
    showIncursionScreen() {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "flex";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    }
    showGameOver() {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "flex";
    }
    gameLoop() {
    }
    gameOver() {
    }
}
