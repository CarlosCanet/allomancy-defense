import { GameObject } from "./gameObject.js";
export class Building extends GameObject {
    name;
    static myId = 0;
    constructor(x, y, w, h, node, name) {
        super(x, y, w, h, node);
        this.node.style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
        // this.node.style.width = `${w}px`;
        // this.node.style.height = `${h}px`;
        this.name = name;
        Building.myId++;
    }
    render = () => {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    };
}
