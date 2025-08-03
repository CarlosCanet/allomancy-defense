export enum gameStates { WaitingToStart, BaseBuilding, Incursioning, GameOver }
export const METALS_RESOURCES = ["Steel", "Bronze", "Copper", "Tin"] as const;
export const OTHER_RESOURCES = ["Coins"] as const;
export const RESOURCES = [...METALS_RESOURCES, ...OTHER_RESOURCES];
export type Metal = typeof METALS_RESOURCES[number];
export type Resource = typeof RESOURCES[number];

export interface Screens{
    startScreenNode: HTMLDivElement;
    gameDefenseScreenNode: HTMLDivElement;
    baseGameBoxNode: HTMLDivElement;
    gameIncursionScreenNode: HTMLDivElement;
    incursionGameBoxNode: HTMLDivElement;
    gameOverScreenNode: HTMLDivElement;
}
export class Game { 
    // ATTRIBUTES
    state: gameStates;
    screenNodes: Screens;
    resourcesDisplayNodes: HTMLDivElement[];
    buildingButtonNodes: HTMLDivElement[];
    alliesButtonNodes: HTMLDivElement[];
    resources: Map<Resource, number>;
    gameFrequency: number;
    tick: number;
    gameIntervalId: number;

    // METHODS
    constructor(screens: Screens) {
        this.state = gameStates.WaitingToStart;
        this.screenNodes = screens;
        // TODO
        this.resourcesDisplayNodes = [document.createElement("div")];
        this.buildingButtonNodes = [document.createElement("div")];
        this.alliesButtonNodes = [document.createElement("div")];
        
        this.resources = new Map<Resource, number>;
        this.gameFrequency = Math.floor(1000 / 60);
        this.tick = 0;
        this.gameIntervalId = 0;
    }

    startGame() {
        this.showBaseScreen();
        this.gameIntervalId = setInterval(this.gameLoop,this.gameFrequency)
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

    // createBuilding(building: Building) {
        
    // }

    // recruitAlly(ally: Character) {
        
    // }
}
