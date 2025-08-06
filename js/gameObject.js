export class GameObject {
    // ATTRIBUTES
    x;
    y;
    w;
    h;
    speedX;
    speedY;
    node;
    gameBoxNode;
    // METHODS
    constructor(x, y, w, h, speedX, speedY, node, gameBoxNode) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedX = speedX;
        this.speedY = speedY;
        this.node = node;
        this.gameBoxNode = gameBoxNode;
    }
    moveUp = (isContained) => {
        this.y -= this.speedY;
        isContained && this.containObject();
    };
    moveDown = (isContained) => {
        this.y += this.speedY;
        isContained && this.containObject();
    };
    moveLeft = (isContained) => {
        this.x -= this.speedX;
        isContained && this.containObject();
    };
    moveRight = (isContained) => {
        this.x += this.speedX;
        isContained && this.containObject();
    };
    containObject = () => {
        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y > this.gameBoxNode.offsetHeight - this.h) {
            this.y = this.gameBoxNode.offsetHeight - this.h;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > this.gameBoxNode.offsetWidth - this.w) {
            this.x = this.gameBoxNode.offsetWidth - this.w;
        }
    };
    isCollidingWith(otherObject) {
        return this.x < otherObject.x + otherObject.w && this.x + this.w > otherObject.x && this.y < otherObject.y + otherObject.h && this.y + this.h > otherObject.y;
    }
    moveTowardsPoint = (pointX, pointY) => {
        const [dx, dy] = [pointX - this.x, pointY - this.y];
        const module = Math.sqrt(dx * dx + dy * dy);
        this.x += (dx / module) * this.speedX;
        this.y += dy / module * this.speedY;
        this.render();
    };
    render = () => {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    };
}
