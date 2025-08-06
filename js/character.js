import { GameObject } from "./gameObject.js";
import { Projectile } from "./projectile.js";
export class Character extends GameObject {
    isPlayer;
    projectiles;
    canShoot;
    timeBetweenShoots;
    constructor(x, y, w, h, node, gameBoxNode, speedX, speedY, isPlayer) {
        super(x, y, w, h, speedX, speedY, node, gameBoxNode);
        this.isPlayer = isPlayer;
        this.node.style.width = `${w}px`;
        this.node.style.height = `${h}px`;
        this.projectiles = [];
        this.canShoot = true;
        this.timeBetweenShoots = 300;
        if (this.isPlayer) {
            document.addEventListener("keydown", this.handleKeys);
            document.addEventListener("click", this.handleClick);
        }
    }
    handleKeys = (event) => {
        if (event.key === "w" || event.key === "ArrowUp") {
            this.moveUp(this.isPlayer);
        }
        else if (event.key === "s" || event.key === "ArrowDown") {
            this.moveDown(this.isPlayer);
        }
        else if (event.key === "a" || event.key === "ArrowLeft") {
            this.moveLeft(this.isPlayer);
        }
        else if (event.key === "d" || event.key === "ArrowRight") {
            this.moveRight(this.isPlayer);
        }
    };
    handleClick = (event) => {
        if (this.canShoot) {
            this.createProjectile(event.layerX, event.layerY);
            this.canShoot = false;
            setTimeout(() => this.canShoot = true, this.timeBetweenShoots);
        }
    };
    createProjectile = (directionX, directionY) => {
        const projectileHeight = 10, projectileWidth = 10;
        const speedX = 4, speedY = 4;
        const newProjectile = new Projectile(this.x + this.w / 2 - projectileWidth / 2, this.y + this.h / 2 - projectileHeight / 2, projectileWidth, projectileHeight, speedX, speedY, document.createElement("div"), this.gameBoxNode, directionX, directionY);
        this.projectiles.push(newProjectile);
        this.gameBoxNode.append(newProjectile.node);
    };
    cleanProjectiles = () => {
        this.projectiles = this.projectiles.filter(projectile => !projectile.isOnTarget);
    };
}
