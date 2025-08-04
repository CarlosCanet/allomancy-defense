import type { Resource } from "./game.js";
import { GameObject } from "./gameObject.js";
export class Bulding extends GameObject {
    resource: Resource;
    amount: number;
    periodInSec: number;
    static myId: number = 0;
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, name: string, resource: Resource, amount: number, periodInSec: number) {
        super(x, y, w, h, node);
        this.node.style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
        this.resource = resource;
        this.amount = amount;
        this.periodInSec = periodInSec;
    }

    render = () =>  {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }
}
