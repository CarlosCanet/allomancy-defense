export class GameObject {
    // ATTRIBUTES
    x: number;
    y: number;
    w: number;
    h: number;
    speedX: number;
    speedY: number;
    node: HTMLDivElement;
    gameBoxNode: HTMLDivElement;
    spritesSrc: Array<string>;
    spriteTicks: number;

    // METHODS
    constructor(x: number, y: number, w: number, h: number, speedX: number, speedY: number, node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedX = speedX;
        this.speedY = speedY;
        this.node = node;
        this.gameBoxNode = gameBoxNode;
        this.spritesSrc = [];
        this.spriteTicks = 20;
    }

    createSpriteArray = (urlImage: string, extImage: string, imagesNumber: number): void => {
        for (let i = 0; i < imagesNumber; i++) {
            this.spritesSrc.push(`${urlImage}-${(i + 1).toString().padStart(2, "0")}.${extImage}`);
        }
    };

    moveUp = (isContained: boolean): void => {
        this.y -= this.speedY;
        isContained && this.containObject();
    };

    moveDown = (isContained: boolean): void => {
        this.y += this.speedY;
        isContained && this.containObject();
    };

    moveLeft = (isContained: boolean): void => {
        this.x -= this.speedX;
        isContained && this.containObject();
    };

    moveRight = (isContained: boolean): void => {
        this.x += this.speedX;
        isContained && this.containObject();
    };

    containObject = (): void => {
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > this.gameBoxNode.offsetHeight - this.h) {
            this.y = this.gameBoxNode.offsetHeight - this.h;
        }
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > this.gameBoxNode.offsetWidth - this.w) {
            this.x = this.gameBoxNode.offsetWidth - this.w;
        }
    };

    isCollidingWith(otherObject: GameObject): boolean {
        return this.x < otherObject.x + otherObject.w && this.x + this.w > otherObject.x && this.y < otherObject.y + otherObject.h && this.y + this.h > otherObject.y;
    }

    moveTowardsPoint = (pointX: number, pointY: number): void => {
        const [dx, dy] = [pointX - this.x, pointY - this.y];
        const module = Math.sqrt(dx * dx + dy * dy);
        this.x += (dx / module) * this.speedX;
        this.y += (dy / module) * this.speedY;
        this.render();
    };

    render = (tick?: number): void => {
        if (this.spritesSrc.length !== 0 && tick) {
            const newURL = `url("${this.spritesSrc[Math.floor(tick / this.spriteTicks * Math.max(Math.abs(this.speedX), Math.abs(this.speedY))) % this.spritesSrc.length]!}")`;
            if (newURL !== this.node.style.backgroundImage) {
                this.node.style.backgroundImage = newURL;
            }
        }
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    };
}
