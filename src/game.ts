import { GameIdle } from "./gameIdle.js";
import { GameIncursion } from "./gameIncursion.js";
import { HouseVenture } from "./houses.js";

export enum gameStates { WaitingToStart, BaseBuilding, Incursioning, GameOver }
export const METALS_RESOURCES = {STEEL: "Steel", BRONZE: "Bronze", COPPER: "Copper", TIN: "Tin"} as const;
export const OTHER_RESOURCES = { COINS: "Coins" } as const;
export const ALL_RESOURCES = { ...METALS_RESOURCES, ...OTHER_RESOURCES } as const;
// export const RESOURCES = [...Object.values(METALS_RESOURCES), ...Object.values(OTHER_RESOURCES)];
export const RESOURCES = [...Object.values(ALL_RESOURCES)];
export type Resource = typeof RESOURCES[number];
export type Metal = typeof METALS_RESOURCES[keyof typeof METALS_RESOURCES];
export const HOUSES = ["Venture", "Cett", "Lekal", "Hastings", "Elariel"];

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
    gameFrequency: number;
    tick: number;
    gameIntervalId: number;
    gameIdle: GameIdle;
    gameIncursion: GameIncursion;

    // METHODS
    constructor(screens: Screens) {
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
        this.gameIntervalId = setInterval(this.gameLoop,this.gameFrequency)
    }

    startIncursion = () => { 
        this.gameIncursion.createIncursionUI();
        this.showIncursionScreen();
    }

    showStartScreen = () => {
        this.screenNodes.startScreenNode.style.display = "flex";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    }

    showBaseScreen = () => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "flex";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    }

    showIncursionScreen = () => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "flex";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    }

    showGameOver = () => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "flex";
    }

    gameLoop = () => {
        this.tick++;
        // console.log(this);
        // Every building produce resource
        this.gameIdle.gameLoop(this.tick);
        if (!this.gameIncursion.isIncursionOver) {
            this.gameIncursion.gameLoop(this.tick);
        } else {
            this.showBaseScreen();
        }
    }

    gameOver = () => {
        
    }

    // createBuilding = (building: Building) => {
        
    // }

    // recruitAlly = (ally: Character) => {
        
    // }
}
