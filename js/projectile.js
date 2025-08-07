import { GameObject } from "./gameObject.js";
export class Projectile extends GameObject {
    targetX;
    targetY;
    isOnTarget;
    constructor(x, y, w, h, speedX, speedY, node, gameBoxNode, targetX, targetY) {
        super(x, y, w, h, speedX, speedY, node, gameBoxNode);
        this.node.classList.add("projectile");
        this.node.style.width = `${w}px`;
        this.node.style.height = `${h}px`;
        this.targetX = targetX + w / 2;
        this.targetY = targetY + h / 2;
        this.isOnTarget = this.positionOnTarget();
        this.render();
    }
    positionOnTarget = () => {
        return ((this.x > (this.targetX - this.w / 2))
            && (this.x < (this.targetX + this.w / 2)))
            && ((this.y > (this.targetY - this.h / 2))
                && (this.y < (this.targetY + this.h / 2)));
    };
    moveTowardsTarget = () => {
        this.moveTowardsPoint(this.targetX, this.targetY);
        this.isOnTarget = this.positionOnTarget();
        if (this.isOnTarget) {
            this.node.remove();
        }
    };
}
