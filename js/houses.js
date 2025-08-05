import { Building } from "./building.js";
import { METALS_RESOURCES, OTHER_RESOURCES, RESOURCES } from "./game.js";
export class House extends Building {
    static houseName;
    static howManyBuildings = 0;
    resource;
    amountRate;
    periodInSec;
    constructor(x, y, w, h, node, name, resource, amountRate, periodInSec) {
        super(x, y, w, h, node, name);
        this.resource = resource;
        this.amountRate = amountRate;
        this.periodInSec = periodInSec;
        const ctor = this.constructor;
        ctor.howManyBuildings++;
        node.classList.add("house-building");
        const initialProductivity = 0.5;
        const boostProductivity = 0;
        this.amountRate = initialProductivity * (ctor.howManyBuildings + boostProductivity);
    }
    static costToBuild() {
        let totalCost = new Map();
        const baseCost = 20;
        const coefficient = 3.5;
        totalCost.set(OTHER_RESOURCES.COINS, baseCost * (coefficient ** this.howManyBuildings));
        return totalCost;
    }
}
export class HouseVenture extends House {
    static houseName = "House Venture";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Venture Building`, METALS_RESOURCES.STEEL, 0, 2);
    }
}
export class HouseCett extends House {
    static houseName = "House Cett";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Cett Building`, OTHER_RESOURCES.COINS, 0, 1);
    }
}
export class HouseLekal extends House {
    static houseName = "House Lekal";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Lekal Building`, METALS_RESOURCES.TIN, 0, 1);
    }
}
export class HouseHasting extends House {
    static houseName = "House Hasting";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Hasting Building`, METALS_RESOURCES.BRONZE, 0, 1);
    }
}
export class HouseElariel extends House {
    static houseName = "House Elariel";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Elariel Building`, METALS_RESOURCES.COPPER, 0, 1);
    }
}
