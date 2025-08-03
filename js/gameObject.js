export class GameObject {
    // ATTRIBUTES
    x;
    y;
    w;
    h;
    node;
    // METHODS
    constructor(x, y, w, h, node) {
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
