import { GameObject } from "./gameObject.js";
import { Projectile } from "./projectile.js";
export class Character extends GameObject {
    isPlayer: boolean;
    projectiles: Array<Projectile>;
    canShoot: boolean;
    timeBetweenShoots: number;
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, gameBoxNode: HTMLDivElement, speedX: number, speedY: number, isPlayer: boolean) {
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

    handleKeys = (event: KeyboardEvent) => {
        if (event.key === "w" || event.key === "ArrowUp") {
            this.moveUp(this.isPlayer);
        } else if (event.key === "s" || event.key === "ArrowDown") {
            this.moveDown(this.isPlayer);
        } else if (event.key === "a" || event.key === "ArrowLeft") {
            this.moveLeft(this.isPlayer);
        } else if (event.key === "d" || event.key === "ArrowRight") {
            this.moveRight(this.isPlayer);
        }
    };

    handleClick = (event: MouseEvent) => {
        if (this.canShoot) {
            this.createProjectile(event.layerX, event.layerY);
            this.canShoot = false;
            setTimeout(() => this.canShoot = true, this.timeBetweenShoots);
        }
    };

    createProjectile = (directionX: number, directionY: number) => {
        const projectileHeight = 10, projectileWidth = 10;
        const speedX = 4, speedY = 4;
        const newProjectile = new Projectile(this.x + this.w / 2 - projectileWidth/2, this.y + this.h / 2 - projectileHeight/2, projectileWidth, projectileHeight, speedX, speedY, document.createElement("div"), this.gameBoxNode, directionX, directionY);
        this.projectiles.push(newProjectile);
        this.gameBoxNode.append(newProjectile.node);
    };

    cleanProjectiles = () => {
        this.projectiles = this.projectiles.filter(projectile => !projectile.isOnTarget);
    }
}
