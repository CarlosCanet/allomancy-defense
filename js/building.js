import { GameObject } from "./gameObject.js";
export class Building extends GameObject {
    resource;
    amountRate;
    periodInSec;
    static myId = 0;
    constructor(x, y, w, h, node, name, resource, amountRate, periodInSec) {
        super(x, y, w, h, node);
        this.node.style.backgroundColor = `#${Math.random().toString(16).slice(-6)}`;
        this.resource = resource;
        this.amountRate = amountRate;
        this.periodInSec = periodInSec;
        Building.myId++;
    }
    render = () => {
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    };
}
