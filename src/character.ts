import { GameObject } from "./gameObject.js";
export class Character extends GameObject {
    gameBoxNode: HTMLDivElement;
    speedX: number;
    speedY: number;
    isPlayer: boolean;
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, gameBoxNode: HTMLDivElement, speedX: number, speedY: number, isPlayer: boolean) {
        super(x, y, w, h, node);
        this.gameBoxNode = gameBoxNode;
        this.speedX = speedX;
        this.speedY = speedY;
        this.isPlayer = isPlayer;
        this.node.style.width = `${w}px`;
        this.node.style.height = `${h}px`;
        if (this.isPlayer) {
            document.addEventListener("keydown", this.handleKeys)
        }
    }
    
    handleKeys = (event: KeyboardEvent) => {
        if (event.key === "w" || event.key === "ArrowUp") {
            this.moveUp();
        } else if (event.key === "s" || event.key === "ArrowDown") {
            this.moveDown();
        } else if (event.key === "a" || event.key === "ArrowLeft") {
            this.moveLeft();
        } else if (event.key === "d" || event.key === "ArrowRight") {
            this.moveRight();
        }
    };

    moveUp = () => {
        this.y -= this.speedY;
        if (this.y < 0) {
            this.y = 0;
        }
    };

    moveDown = () => {
        this.y += this.speedY;
        if (this.y > this.gameBoxNode.offsetHeight - this.h) {
            this.y = this.gameBoxNode.offsetHeight - this.h;
        }
    };

    moveLeft = () => {
        this.x -= this.speedX;
        if (this.x < 0) {
            this.x = 0;
        }
    };

    moveRight = () => {
        this.x += this.speedX;
        if (this.x > this.gameBoxNode.offsetWidth - this.w) {
            this.x = this.gameBoxNode.offsetWidth - this.w;
        }
    };
}
