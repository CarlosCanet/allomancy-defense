import { Character } from "./character.js";
export class Enemy extends Character {
    shouldBeDeleted = false;
    constructor(w, h, gameBoxNode, speedX) {
        super(0, 0, w, h, document.createElement("div"), gameBoxNode, speedX, 0, false);
        this.node.classList.add("enemy");
        this.node.innerText = "E";
        this.node.style.width = `${w}px`;
        this.node.style.height = `${h}px`;
        this.spawnEnemy();
    }
    spawnEnemy = () => {
        const option = Math.floor(Math.random() * 4);
        const offset = 100;
        switch (option) {
            case 0:
                this.x = -this.w - offset;
                this.y = Math.floor(this.gameBoxNode.offsetHeight / 3) - 20;
                this.speedX = Math.abs(this.speedX);
                break;
            case 1:
                this.x = this.gameBoxNode.offsetWidth + this.w + offset;
                this.y = Math.floor(this.gameBoxNode.offsetHeight / 3) - 20;
                this.speedX = -Math.abs(this.speedX);
                break;
            case 2:
                this.x = -this.w - offset;
                this.y = Math.floor((this.gameBoxNode.offsetHeight * 2) / 3) - 20;
                this.speedX = Math.abs(this.speedX);
                break;
            case 3:
                this.x = this.gameBoxNode.offsetWidth + this.w + offset;
                this.y = Math.floor((this.gameBoxNode.offsetHeight * 2) / 3) - 20;
                this.speedX = -Math.abs(this.speedX);
                break;
        }
        this.gameBoxNode.append(this.node);
    };
    isOutsideGameBox = () => {
        return this.x + this.w < 0 || this.x > this.gameBoxNode.offsetWidth || this.y + this.h < 0 || this.y > this.gameBoxNode.offsetHeight;
    };
    automaticMovement = () => {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.speedX < 0) {
            this.shouldBeDeleted = this.x + this.w < 0;
        }
        else if (this.speedX > 0) {
            this.shouldBeDeleted = this.x > this.gameBoxNode.offsetWidth;
        }
        if (this.speedY < 0) {
            this.shouldBeDeleted = this.y + this.h < 0;
        }
        else if (this.speedY > 0) {
            this.shouldBeDeleted = this.y > this.gameBoxNode.offsetHeight;
        }
        this.render();
    };
}
