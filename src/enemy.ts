import { Character } from "./character.js";

export class Enemy extends Character {
    shouldBeDeleted: boolean = false;
    constructor(w: number, h: number, gameBoxNode: HTMLDivElement, speedX: number) {
        super(0, 0, w, h, document.createElement("div"), gameBoxNode, speedX, 0, false);
        this.node.classList.add("enemy");
        this.node.style.width = `${w}px`;
        this.node.style.height = `${h}px`;
        this.spawnEnemy();
    }

    addSpritesLeft = () => {
        this.createSpriteArray("../images/characters/guard/soldier-walk-left", "png", 15);
    }
    
    addSpritesRight = () => {
        this.createSpriteArray("../images/characters/guard/soldier-walk-right", "png", 15);
    }

    spawnEnemy = () => {
        const option = Math.floor(Math.random() * 4);
        const offset = 100;
        switch (option) {
            case 0:
                this.x = -this.w - offset;
                this.y = Math.floor(this.gameBoxNode.offsetHeight / 3) - 20;
                this.speedX = Math.abs(this.speedX);
                this.addSpritesRight();
                break;
            case 1:
                this.x = this.gameBoxNode.offsetWidth + this.w + offset;
                this.y = Math.floor(this.gameBoxNode.offsetHeight / 3) - 20;
                this.speedX = -Math.abs(this.speedX);
                this.addSpritesLeft();
                break;
            case 2:
                this.x = -this.w - offset;
                this.y = Math.floor((this.gameBoxNode.offsetHeight * 2) / 3) - 20;
                this.speedX = Math.abs(this.speedX);
                this.addSpritesRight();
                break;
            case 3:
                this.x = this.gameBoxNode.offsetWidth + this.w + offset;
                this.y = Math.floor((this.gameBoxNode.offsetHeight * 2) / 3) - 20;
                this.speedX = -Math.abs(this.speedX);
                this.addSpritesLeft();
                break;
        }
        this.gameBoxNode.append(this.node);
    };

    isOutsideGameBox = (): boolean => {
        return this.x + this.w < 0 || this.x > this.gameBoxNode.offsetWidth || this.y + this.h < 0 || this.y > this.gameBoxNode.offsetHeight;
    };

    automaticMovement = (tick: number): void => {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.speedX < 0) {
            this.shouldBeDeleted = this.x + this.w < 0;
        } else if (this.speedX > 0) {
            this.shouldBeDeleted = this.x > this.gameBoxNode.offsetWidth;
        }
        if (this.speedY < 0) {
            this.shouldBeDeleted = this.y + this.h < 0;
        } else if (this.speedY > 0) {
            this.shouldBeDeleted = this.y > this.gameBoxNode.offsetHeight;
        }
        this.render(tick);
    };
}
