import { Bulding } from "./building.js";
import {} from "./game.js";
export class House extends Bulding {
    constructor(x, y, w, h, node, name, resource, amount, periodInSec) {
        super(x, y, w, h, node, name, resource, amount, periodInSec);
    }
}
