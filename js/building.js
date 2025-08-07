import { GameObject } from "./gameObject.js";
export class Building extends GameObject {
    name;
    sprites;
    static myId = 0;
    constructor(x, y, w, h, node, gameBoxNode, name) {
        super(x, y, w, h, 0, 0, node, gameBoxNode);
        // this.node.style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
        // this.node.style.width = `${w}px`;
        // this.node.style.height = `${h}px`;
        this.name = name;
        Building.myId++;
        this.sprites = [];
    }
}
