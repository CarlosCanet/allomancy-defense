import { GameObject } from "./gameObject.js";
export class Building extends GameObject {
    name: string;
    sprites: Array<string>;
    static myId: number = 0;
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, gameBoxNode: HTMLDivElement, name: string) {
        super(x, y, w, h, 0, 0, node, gameBoxNode);
        this.name = name;
        Building.myId++;
        this.sprites = [];
    }
}
