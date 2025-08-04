import { GameObject } from "./gameObject.js";
export class Bulding extends GameObject {
    resource;
    amount;
    periodInSec;
    static myId = 0;
    constructor(x, y, w, h, node, name, resource, amount, periodInSec) {
        super(x, y, w, h, node);
        this.node.style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
        this.resource = resource;
        this.amount = amount;
        this.periodInSec = periodInSec;
    }
    render = () => {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    };
}
