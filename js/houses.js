import { Building } from "./building.js";
import { METALS_RESOURCES, OTHER_RESOURCES, RESOURCES } from "./game.js";
export class House extends Building {
    static houseName;
    static howManyBuildings;
    constructor(x, y, w, h, node, name, resource, amountRate, periodInSec) {
        super(x, y, w, h, node, name, resource, amountRate, periodInSec);
        House.howManyBuildings++;
        node.classList.add("house-building");
    }
}
export class HouseVenture extends House {
    static houseName = "House Venture";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Venture Building`, METALS_RESOURCES[0], 0, 2);
    }
}
export class HouseCett extends House {
    static houseName = "House Cett";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Cett Building`, OTHER_RESOURCES[0], 0, 1);
    }
}
export class HouseLekal extends House {
    static houseName = "House Lekal";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Lekal Building`, METALS_RESOURCES[3], 0, 1);
    }
}
export class HouseHasting extends House {
    static houseName = "House Hasting";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Hasting Building`, METALS_RESOURCES[1], 0, 1);
    }
}
export class HouseElariel extends House {
    static houseName = "House Elariel";
    static howManyBuildings = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, `House Elariel Building`, METALS_RESOURCES[2], 0, 1);
    }
}
