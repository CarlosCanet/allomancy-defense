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
    render() {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }
}
