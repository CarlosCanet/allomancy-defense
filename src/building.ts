import type { Resource } from "./game.js";
import { GameObject } from "./gameObject.js";
export class Building extends GameObject {
    name: string;
    static myId: number = 0;
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, gameBoxNode: HTMLDivElement, name: string) {
        super(x, y, w, h, 0, 0, node, gameBoxNode);
        this.node.style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
        // this.node.style.width = `${w}px`;
        // this.node.style.height = `${h}px`;
        this.name = name;
        Building.myId++;
    }

    render = () => {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }
}
