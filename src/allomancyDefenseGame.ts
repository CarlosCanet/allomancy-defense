import { GameIdle } from "./gameIdle.js";
import { GameIncursion } from "./gameIncursion.js";
import { HouseVenture } from "./houses.js";

export enum GameStates { WaitingToStart, BaseBuilding, Incursioning, GameOver }
export const METALS_RESOURCES = { STEEL: "Steel", BRONZE: "Bronze", COPPER: "Copper", TIN: "Tin" } as const;
export const OTHER_RESOURCES = { COINS: "Coins" } as const;
export const ALL_RESOURCES = { ...METALS_RESOURCES, ...OTHER_RESOURCES } as const;
export const RESOURCES = [...Object.values(ALL_RESOURCES)];
export type Resource = (typeof RESOURCES)[number];
export type Metal = (typeof METALS_RESOURCES)[keyof typeof METALS_RESOURCES];
export const RESOURCE_IMAGES: Record<Resource, string> = {
    [METALS_RESOURCES.STEEL]: "../images/resources/icon-Steel.png",
    [METALS_RESOURCES.BRONZE]: "../images/resources/icon-Bronze.png",
    [METALS_RESOURCES.COPPER]: "../images/resources/icon-Copper.png",
    [METALS_RESOURCES.TIN]: "../images/resources/icon-Tin.png",
    [OTHER_RESOURCES.COINS]: "../images/resources/icon-Coins.png",
}
export const HOUSES = ["Venture", "Cett", "Lekal", "Hastings", "Elariel"];

export interface Screens {
    startScreenNode: HTMLDivElement;
    gameDefenseScreenNode: HTMLDivElement;
    baseGameBoxNode: HTMLDivElement;
    gameIncursionScreenNode: HTMLDivElement;
    incursionGameBoxNode: HTMLDivElement;
    gameOverScreenNode: HTMLDivElement;
}

export class AllomancyDefenseGame {
    // ATTRIBUTES
    gameState: GameStates;
    screenNodes: Screens;
    gameFrequency: number;
    tick: number;
    gameIntervalId: number;
    numberOfIncursions: number;
    gameIdle: GameIdle | null;
    gameIncursion: GameIncursion | null;
    startBtnNode: HTMLButtonElement;
    restartBtnNode: HTMLButtonElement;
    continueBtnNode: HTMLButtonElement;
    newGameBtnNode: HTMLButtonElement;
    

    // METHODS
    constructor(screens: Screens) {
        this.gameState = GameStates.WaitingToStart;
        this.screenNodes = screens;
        this.startBtnNode = document.createElement("button");
        this.restartBtnNode = document.createElement("button");
        this.startBtnNode.id = "start-btn";
        this.startBtnNode.innerText = "Start the rebellion";
        this.restartBtnNode.id = "restart-btn";
        this.restartBtnNode.innerHTML = "Be the hope.<br><br>Try again...";
        this.continueBtnNode = document.createElement("button");
        this.newGameBtnNode = document.createElement("button");
        this.continueBtnNode.id = "continue-btn";
        this.continueBtnNode.innerText = "Continue";
        this.newGameBtnNode.id = "newGame-btn";
        this.newGameBtnNode.innerText = "New rebellion";

        this.gameFrequency = Math.floor(1000 / 60);
        this.tick = 0;
        this.gameIntervalId = 0;
        this.numberOfIncursions = 0;

        this.gameIdle = null;
        this.gameIncursion = null;
        this.createStartUI();
        this.createGameOverUI();
    }

    createStartUI = (): void => {
        const containerNode = document.createElement("div");
        containerNode.classList.add("container");
        const startText1Node = document.createElement("div");
        const startText2Node = document.createElement("div");
        startText1Node.classList.add("start-game-text");
        startText2Node.classList.add("start-game-text");
        startText1Node.innerHTML = `<h3>Start your rebellion</h3>
        <p> Get resources, set alliances with the Great Houses of Luthadel.</p>
        <p> Get more resources; you don't have enough.</p>
        <p> Recruit allies to join the rebellion </p>
        <p> But beware the time! If you stay idle for too long, <br> you will stop getting resources.</p>
        <p> So you should try to make incursions into Luthadel to gain more resources.</p>
        <br><br><br><br><p><i>“Our belief is often strongest when it should be weakest.”</i></p>`;
        startText2Node.innerHTML = `<h3>Get resources</h3>
        <p>If you go into the city you can gain more resources.</p>
        <p>Maybe your allies can help you see through the mist.</p>
        <p>The soldiers of the Lord Ruler are looking for you, <br>so you must avoid them or use your metals and coins to kill them.</p>
        <p>If they get you, the rebellion is going to lose more than your life</p>
        <p>Try to make small incursions, but remember that you can <i>'escape'</i> at any moment.</p>
        <p>It's better to live, so you can see another day rising with ashes.</p>
        <br><br><br><br><p><i>“When you remember me, please remember that. Remember to smile.”</i></p>`;
        containerNode.append(startText1Node);
        containerNode.append(startText2Node);
        this.screenNodes.startScreenNode.append(containerNode);
        this.screenNodes.startScreenNode.append(this.startBtnNode);
        this.startBtnNode.addEventListener("click", this.startGame);
        this.continueBtnNode.addEventListener("click", this.startIdleGame);
        this.newGameBtnNode.addEventListener("click", () => {
            localStorage.clear();
            this.startIdleGame();
        });
        
        this.showStartScreen();
    }

    createGameOverUI = (): void => {
        const containerNode = document.createElement("div");
        containerNode.classList.add("container");
        containerNode.id = "game-over-container";
        const gameOverText1 = document.createElement("p");
        const gameOverText2 = document.createElement("p");
        const gameOverText3 = document.createElement("p");
        gameOverText1.innerHTML = `<i>But you can't kill me. I represent that one thing you've never been able to kill, no matter how hard you try. I AM HOPE.</i>`;
        gameOverText2.innerHTML = `<i>No more memories! Focus on the moment.</i>`;
        gameOverText3.innerText = `Your rebellion has failed!`;
        containerNode.append(gameOverText3);
        containerNode.append(gameOverText1);
        containerNode.append(gameOverText2);
        containerNode.append(this.restartBtnNode);
        this.screenNodes.gameOverScreenNode.append(containerNode);
        this.restartBtnNode.addEventListener("click", this.startGame);
    }

    startGame = (): void => {
        if (localStorage.length !== 0) {
            const modalNode = document.createElement("div");
            modalNode.classList.add("modal");
            modalNode.innerHTML = `<p> Do you want to continue your rebellion?</p>`;
            modalNode.append(this.continueBtnNode);
            modalNode.append(this.newGameBtnNode);
            this.screenNodes.startScreenNode.append(modalNode);
        } else {
            this.startIdleGame();
        }
    };

    startIdleGame = (): void => {
        this.gameState = GameStates.BaseBuilding;
        this.gameIdle = new GameIdle(this.screenNodes.baseGameBoxNode, this.gameFrequency);
        this.gameIdle.createBaseUI();
        this.showBaseScreen();
        this.gameIntervalId = setInterval(this.gameLoop, this.gameFrequency);
        this.gameIdle.saveGameIdleInLocalStorage();
    }

    startIncursion = (): void => {
        this.gameState = GameStates.Incursioning;
        this.gameIncursion = new GameIncursion(this.screenNodes.incursionGameBoxNode, this.gameFrequency, this.gameIdle!.resources);
        this.gameIdle!.shouldStartIncursion = false;
        this.gameIncursion.createIncursionUI();
        this.showIncursionScreen();
    };

    finishIncursion = (): void => {
        this.gameIncursion = null;
        this.gameIdle!.restartTimeSinceIncursion(this.tick);
        this.showBaseScreen();
    }

    showStartScreen = (): void => {
        this.screenNodes.startScreenNode.style.display = "flex";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    };

    showBaseScreen = (): void => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "flex";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    };

    showIncursionScreen = (): void => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "flex";
        this.screenNodes.gameOverScreenNode.style.display = "none";
    };

    showGameOver = (): void => {
        this.screenNodes.startScreenNode.style.display = "none";
        this.screenNodes.gameDefenseScreenNode.style.display = "none";
        this.screenNodes.gameIncursionScreenNode.style.display = "none";
        this.screenNodes.gameOverScreenNode.style.display = "flex";
    };

    gameLoop = (): void => {
        this.tick++;
        switch (this.gameState) {
            case GameStates.WaitingToStart:
                break;
            case GameStates.BaseBuilding:
                if (this.gameIdle) {
                    this.gameIdle.bgMusicNode.paused && this.gameIdle.bgMusicNode.play();
                    this.gameIdle.gameLoop(this.tick);
                    if (this.gameIdle.shouldStartIncursion) {
                        this.gameState = GameStates.Incursioning;
                        this.numberOfIncursions++;
                        this.gameIdle.bgMusicNode.pause();
                        this.startIncursion();
                    }
                }
                break;
            case GameStates.Incursioning:
                if (this.gameIncursion) {
                    this.gameIncursion.bgMusicNode.paused && this.gameIncursion.bgMusicNode.play();
                    this.gameIncursion.gameLoop(this.tick);
                    if (this.gameIncursion.isIncursionOver) {
                        this.gameState = GameStates.BaseBuilding;
                        if (this.gameIncursion.isPlayerCaught) {
                            this.gameIdle && this.gameIdle.penalty(1);
                            if (this.gameIdle && (this.gameIdle.buildings.length === 0)) {
                                this.gameState = GameStates.GameOver;
                            }
                        }
                        this.gameIncursion.bgMusicNode.pause();
                        this.finishIncursion();
                    }
                }
                break;
            case GameStates.GameOver:
                this.gameOver();
                break;
        }
    };

    gameOver = (): void => {
        localStorage.clear();
        this.showGameOver();
    };
}
