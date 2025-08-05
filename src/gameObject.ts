export class GameObject {
    // ATTRIBUTES
    x: number;
    y: number;
    w: number;
    h: number;
    node: HTMLDivElement;

    // METHODS
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.node = node;
    }

    isCollidingWith(otherObject: GameObject): boolean {
        return (
            this.x < otherObject.x + otherObject.w &&
            this.x + this.w > otherObject.x &&
            this.y < otherObject.y + otherObject.h &&
            this.y + this.h > otherObject.y
        );
    }
    
    render() {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }
}
