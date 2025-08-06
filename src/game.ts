import { GameIdle } from "./gameIdle.js";
import { GameIncursion } from "./gameIncursion.js";
import { HouseVenture } from "./houses.js";

export enum GameStates { WaitingToStart, BaseBuilding, Incursioning, GameOver }
export const METALS_RESOURCES = { STEEL: "Steel", BRONZE: "Bronze", COPPER: "Copper", TIN: "Tin" } as const;
export const OTHER_RESOURCES = { COINS: "Coins" } as const;
export const ALL_RESOURCES = { ...METALS_RESOURCES, ...OTHER_RESOURCES } as const;
// export const RESOURCES = [...Object.values(METALS_RESOURCES), ...Object.values(OTHER_RESOURCES)];
export const RESOURCES = [...Object.values(ALL_RESOURCES)];
export type Resource = (typeof RESOURCES)[number];
export type Metal = (typeof METALS_RESOURCES)[keyof typeof METALS_RESOURCES];
export const HOUSES = ["Venture", "Cett", "Lekal", "Hastings", "Elariel"];

export interface Screens {
    startScreenNode: HTMLDivElement;
    gameDefenseScreenNode: HTMLDivElement;
    baseGameBoxNode: HTMLDivElement;
    gameIncursionScreenNode: HTMLDivElement;
    incursionGameBoxNode: HTMLDivElement;
    gameOverScreenNode: HTMLDivElement;
}

export class Game {
    // ATTRIBUTES
    gameState: GameStates;
    screenNodes: Screens;
    gameFrequency: number;
    tick: number;
    gameIntervalId: number;
    gameIdle: GameIdle;
    gameIncursion: GameIncursion | null;
    startBtnNode: HTMLButtonElement;

    // METHODS
    constructor(screens: Screens) {
        this.gameState = GameStates.WaitingToStart;
        this.screenNodes = screens;
        this.startBtnNode = document.createElement("button");
        this.startBtnNode.id = "start-btn";
        this.startBtnNode.innerText = "Start game";

        this.gameFrequency = Math.floor(1000 / 60);
        this.tick = 0;
        this.gameIntervalId = 0;
        this.showStartScreen();

        this.gameIdle = new GameIdle(this.screenNodes.baseGameBoxNode, this.gameFrequency);
        this.gameIncursion = null;
        this.createStartUI();
    }

    createStartUI = () => {
        const imgNode = document.createElement("img");
        imgNode.src = "https://placecats.com/500/300";
        imgNode.width = 500;
        imgNode.alt = "Logo";
        this.screenNodes.startScreenNode.append(imgNode);
        this.screenNodes.startScreenNode.append(this.startBtnNode);
        this.startBtnNode.addEventListener("click", this.startGame);
    }

    startGame = () => {
        this.gameState = GameStates.BaseBuilding;
        this.gameIdle.createBaseUI();
        this.showBaseScreen();
        this.gameIntervalId = setInterval(this.gameLoop, this.gameFrequency);
    };

    startIncursion = () => {
        this.gameState = GameStates.Incursioning;
        this.gameIncursion = new GameIncursion(this.screenNodes.incursionGameBoxNode, this.gameFrequency, this.gameIdle.resources);
        this.gameIdle.shouldStartIncursion = false;
        this.gameIncursion.createIncursionUI();
        this.showIncursionScreen();
    };

    finishIncursion = () => {
        this.gameIncursion = null;
        this.showBaseScreen();
    }

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
        switch (this.gameState) {
            case GameStates.WaitingToStart:
                break;
            case GameStates.BaseBuilding:
                this.gameIdle.gameLoop(this.tick);
                if (this.gameIdle.shouldStartIncursion) {
                    this.gameState = GameStates.Incursioning;
                    this.startIncursion();
                }
                break;
            case GameStates.Incursioning:
                this.gameIncursion && this.gameIncursion.gameLoop(this.tick);
                this.gameIncursion && this.gameIncursion.isIncursionOver && (this.gameState = GameStates.BaseBuilding) && this.finishIncursion();
                break;
            case GameStates.GameOver:
                this.gameOver();
                break;
        }
    };

    gameOver = () => {
        this.showGameOver();
    };

    // createBuilding = (building: Building) => {

    // }

    // recruitAlly = (ally: Character) => {

    // }
}
