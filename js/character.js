import { OTHER_RESOURCES } from "./allomancyDefenseGame.js";
import { GameObject } from "./gameObject.js";
import { Projectile } from "./projectile.js";
export class Character extends GameObject {
    isPlayer;
    projectiles;
    coinsPerShot;
    canShoot;
    timeBetweenShoots;
    gameIncursion;
    coinSFXNode;
    deathSFXNode;
    constructor(x, y, w, h, node, gameBoxNode, speedX, speedY, isPlayer, gameIncursion) {
        super(x, y, w, h, speedX, speedY, node, gameBoxNode);
        this.isPlayer = isPlayer;
        this.node.style.width = `${w}px`;
        this.node.style.height = `${h}px`;
        this.node.classList.add("character");
        this.projectiles = [];
        this.canShoot = true;
        this.coinsPerShot = 10;
        this.timeBetweenShoots = 300;
        this.gameIncursion = gameIncursion;
        this.coinSFXNode = document.createElement("audio");
        this.coinSFXNode.src = "./sfx/coinDrop-CrunchpixStudio.mp3";
        this.coinSFXNode.volume = 0.1;
        this.deathSFXNode = document.createElement("audio");
        this.deathSFXNode.src = "./sfx/playerDeath.mp3";
        this.deathSFXNode.volume = 0.4;
        this.gameBoxNode.append(this.coinSFXNode);
        this.gameBoxNode.append(this.deathSFXNode);
        if (this.isPlayer) {
            this.createSpriteArray("./images/characters/adventurerFemale/adventurerFemale-walkright", "png", 8);
            document.addEventListener("keydown", this.handleKeys);
            document.addEventListener("click", this.handleClick);
        }
    }
    handleKeys = (event) => {
        if (event.key === "w" || event.key === "ArrowUp") {
            this.createSpriteArray("./images/characters/adventurerFemale/adventurerFemale-walkup", "png", 8);
            this.moveUp(this.isPlayer);
        }
        else if (event.key === "s" || event.key === "ArrowDown") {
            this.createSpriteArray("./images/characters/adventurerFemale/adventurerFemale-walkdown", "png", 8);
            this.moveDown(this.isPlayer);
        }
        else if (event.key === "a" || event.key === "ArrowLeft") {
            this.createSpriteArray("./images/characters/adventurerFemale/adventurerFemale-walkleft", "png", 8);
            this.moveLeft(this.isPlayer);
        }
        else if (event.key === "d" || event.key === "ArrowRight") {
            this.createSpriteArray("./images/characters/adventurerFemale/adventurerFemale-walkright", "png", 8);
            this.moveRight(this.isPlayer);
        }
    };
    handleClick = (event) => {
        const coins = this.gameIncursion.resources.get(OTHER_RESOURCES.COINS);
        if (this.canShoot && coins >= this.coinsPerShot) {
            this.coinSFXNode.play();
            this.createProjectile(event.layerX, event.layerY);
            this.canShoot = false;
            this.gameIncursion.resources.set(OTHER_RESOURCES.COINS, coins - this.coinsPerShot);
            setTimeout(() => this.canShoot = true, this.timeBetweenShoots);
        }
    };
    createProjectile = (directionX, directionY) => {
        const projectileHeight = 10, projectileWidth = 10;
        const speedX = 6, speedY = 6;
        const newProjectile = new Projectile(this.x + this.w / 2 - projectileWidth / 2, this.y + this.h / 2 - projectileHeight / 2, projectileWidth, projectileHeight, speedX, speedY, document.createElement("div"), this.gameBoxNode, directionX, directionY);
        this.projectiles.push(newProjectile);
        this.gameBoxNode.append(newProjectile.node);
    };
    cleanProjectiles = () => {
        this.projectiles = this.projectiles.filter(projectile => !projectile.isOnTarget);
    };
}
