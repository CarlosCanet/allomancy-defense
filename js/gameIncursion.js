import { Building } from "./building.js";
import { Character } from "./character.js";
import { Enemy } from "./enemy.js";
import { METALS_RESOURCES, RESOURCES } from "./allomancyDefenseGame.js";
import { House } from "./houses.js";
import { Game, MenuSection } from "./game.js";
export class GameIncursion extends Game {
    resourcesMenuSectionNode;
    alliesMenuSectionNode;
    fogNode;
    producerAreas;
    playerCharacter;
    enemies;
    progressLevel;
    isIncursionOver;
    isPlayerCaught;
    gameTimer;
    gameTimerNode;
    gameTimerInterval;
    constructor(gameBoxNode, gameFrequency, resources) {
        super(gameBoxNode, gameFrequency);
        this.menuNode.classList.add("menu");
        this.menuNode.id = "menu-incursion";
        this.baseButtonsNode.classList.add("menu-list");
        this.baseButtonsNode.id = "menu-incursion-list";
        this.baseNode.id = "incursion-ui";
        this.resourcesMenuSectionNode = new MenuSection("Resources", "resources-li");
        this.alliesMenuSectionNode = new MenuSection("Allies", "allies-li");
        this.fogNode = document.createElement("div");
        this.fogNode.classList.add("fog");
        this.resources = resources;
        this.producerAreas = [];
        this.enemies = [];
        this.progressLevel = 1;
        this.isIncursionOver = false;
        this.isPlayerCaught = false;
        this.playerCharacter = new Character(30, 40, 24, 48, document.createElement("div"), this.baseNode, 10, 10, true, this);
        this.playerCharacter.node.id = "player-character";
        this.baseNode.append(this.playerCharacter.node);
        this.playerCharacter.render();
        document.addEventListener("keydown", this.handleKeyboardEvents);
        this.gameTimerNode = document.createElement("div");
        this.gameTimerNode.classList.add("timer");
        this.baseNode.append(this.gameTimerNode);
        const incursionDuration = 50000;
        this.gameTimer = incursionDuration / 1000;
        this.gameTimerInterval = setInterval(() => this.gameTimer--, 1000);
        setTimeout(() => {
            this.isIncursionOver = true;
            clearInterval(this.gameTimerInterval);
        }, incursionDuration);
    }
    getTimerString = () => {
        const minutes = Math.floor(this.gameTimer / 60);
        const seconds = Math.floor(this.gameTimer % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    createIncursionUI = () => {
        this.gameBoxNode.innerHTML = "";
        this.gameBoxNode.append(this.menuNode);
        this.gameBoxNode.append(this.baseNode);
        this.baseNode.append(this.fogNode);
        const h2Node = document.createElement("h2");
        h2Node.innerText = "Menu";
        this.menuNode.append(h2Node);
        this.menuNode.append(this.baseButtonsNode);
        this.baseButtonsNode.append(this.resourcesMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.alliesMenuSectionNode.sectionNode);
        for (const [resource, amount] of this.resources.entries()) {
            this.resourcesMenuSectionNode.addElement(resource, resource, amount);
        }
        // this.createBuildings();
        this.bgMusicNode.src = "../sfx/backgroundMusic-incursion-Emmraan.mp3";
        this.bgMusicNode.loop = true;
        // this.bgMusicNode!.autoplay = true;
        this.bgMusicNode.volume = 0.01;
        setTimeout(this.createArea, 100);
        setTimeout(this.createArea, this.randomIntegerRange(5000, 1000));
    };
    createBuildings = () => {
        const varX = 150, varY = 50, varSize = 0.5;
        const x = 150, y = 80, w = 100, h = 100;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                let dx = Math.floor(Math.random() * varX - varX / 2);
                let dy = Math.floor(Math.random() * varY - varY / 2);
                let ds = Math.random() * varSize - varSize / 3 + 1;
                let newBuilding = new Building(x + i * 350 + dx, y + j * 200 + dy, w * ds, h * ds, document.createElement("div"), this.gameBoxNode, "");
                newBuilding.node.style.width = `${newBuilding.w}px`;
                newBuilding.node.style.height = `${newBuilding.h}px`;
                newBuilding.node.classList.add("static-buildings");
                let houseNumber = this.randomIntegerRange(19, 1).toString().padStart(2, "0");
                let animationNumber = this.randomIntegerRange(14, 1).toString().padStart(2, "0");
                newBuilding.node.style.backgroundImage = `url("../images/houses/House${houseNumber}-${animationNumber}.png")`;
                newBuilding.render();
                this.buildings.push(newBuilding);
                this.baseNode.append(newBuilding.node);
            }
        }
    };
    createArea = () => {
        const w = 100, h = 100, varSize = 1;
        // const x = Math.floor(Math.random() * (this.baseNode.offsetWidth - w));
        // const y = Math.floor(Math.random() * (this.baseNode.offsetHeight - 2*h));
        const x = this.randomIntegerRange(this.baseNode.offsetWidth - w, 0);
        const y = this.randomIntegerRange(this.baseNode.offsetHeight - 2 * h, 0);
        const ds = Math.random() * varSize - varSize / 2 + 1;
        const resourceToGenerate = RESOURCES[this.randomIntegerRange(RESOURCES.length, 0)];
        const newArea = new House(x, y, w * ds, h * ds, document.createElement("div"), this.gameBoxNode, "", resourceToGenerate, 5, 1);
        newArea.node.style.width = `${newArea.w}px`;
        newArea.node.style.height = `${newArea.h}px`;
        newArea.node.classList.add("area-producer");
        newArea.node.classList.add(`${resourceToGenerate}-producer`);
        newArea.node.innerText = resourceToGenerate;
        newArea.render();
        this.producerAreas.push(newArea);
        this.baseNode.append(newArea.node);
        setTimeout(() => {
            newArea.node.remove();
            this.producerAreas.splice(this.producerAreas.indexOf(newArea), 1);
            setTimeout(() => this.createArea(), this.randomIntegerRange(20000, 1000));
        }, this.randomIntegerRange(10000, 5000));
    };
    handleKeyboardEvents = (event) => {
        if (event.key === "Escape") {
            this.isIncursionOver = true;
        }
    };
    spawnEnemy = () => {
        this.enemies.push(new Enemy(32, 53, this.baseNode, this.randomIntegerRange(4, 1), this));
    };
    checkDespawnEnemy = () => {
        if (this.enemies[0]?.shouldBeDeleted) {
            this.enemies[0].node.remove();
            this.enemies.shift();
        }
    };
    updateMistOfWar = () => {
        const mistRadius = (this.resources.get(METALS_RESOURCES.TIN) > 0) ? "400px" : "200px";
        this.fogNode.style.setProperty("--mist-radius", `${mistRadius}`);
        this.fogNode.style.setProperty("--mist-x", `${this.playerCharacter.x.toString()}px`);
        this.fogNode.style.setProperty("--mist-y", `${this.playerCharacter.y.toString()}px`);
    };
    gameLoop = (tick) => {
        // Update timer
        this.gameTimerNode.innerText = this.getTimerString();
        // Player and its projectiles
        this.playerCharacter.render(tick);
        this.updateMistOfWar();
        this.playerCharacter.projectiles.forEach(projectile => {
            projectile.moveTowardsTarget();
            this.enemies.forEach((enemy, index) => {
                if (projectile.isCollidingWith(enemy)) {
                    enemy.deathSFXNode.play();
                    enemy.node.remove();
                    this.enemies.splice(index, 1);
                }
            });
        });
        this.playerCharacter.cleanProjectiles();
        // Producer areas
        this.producerAreas.forEach((area) => {
            if (this.hasPassedAPeriod(tick, area.periodInSec) && this.playerCharacter.isCollidingWith(area)) {
                let amount = this.resources.get(area.resource);
                if (amount !== undefined) {
                    this.resources.set(area.resource, amount + area.amountRate);
                }
            }
        });
        // Enemies and its projectiles
        if (this.hasPassedAPeriod(tick, this.randomIntegerRange(6 / this.progressLevel, 2 / this.progressLevel))) {
            this.spawnEnemy();
        }
        this.enemies.forEach((enemy) => {
            enemy.automaticMovement(tick);
            if (enemy.isCollidingWith(this.playerCharacter)) {
                this.isIncursionOver = true;
                this.isPlayerCaught = true;
                this.playerCharacter.deathSFXNode.play();
            }
        });
        this.checkDespawnEnemy();
        // Resources
        this.updateResourcesMenu();
    };
}
