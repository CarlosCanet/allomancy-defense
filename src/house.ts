import { Bulding } from "./building.js"
import { type Resource } from "./game.js";

export class House extends Bulding{
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, name: string, resource: Resource, amount: number, periodInSec: number) {
        super(x, y, w, h, node, name, resource, amount, periodInSec);
    }
}