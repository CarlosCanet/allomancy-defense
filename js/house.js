import { Building } from "./building.js";
import {} from "./game.js";
export class House extends Building {
    constructor(x, y, w, h, node, name, resource, amount, periodInSec) {
        super(x, y, w, h, node, name, resource, amount, periodInSec);
    }
}
