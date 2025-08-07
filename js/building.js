import { GameObject } from "./gameObject.js";
export class Building extends GameObject {
    name;
    sprites;
    static myId = 0;
    constructor(x, y, w, h, node, gameBoxNode, name) {
        super(x, y, w, h, 0, 0, node, gameBoxNode);
        this.name = name;
        Building.myId++;
        this.sprites = [];
    }
}
