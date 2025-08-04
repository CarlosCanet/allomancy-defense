import { Building } from "./building.js";
import { METALS_RESOURCES, OTHER_RESOURCES, RESOURCES } from "./game.js";
export class House extends Building {
    constructor(x, y, w, h, node, name, resource, amountRate, periodInSec) {
        super(x, y, w, h, node, name, resource, amountRate, periodInSec);
    }
}
export class HouseVenture extends House {
    static HOUSE_VENTURE_ID = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, "House Venture Building", METALS_RESOURCES[0], 0, 1);
        HouseVenture.HOUSE_VENTURE_ID++;
    }
}
export class HouseCett extends House {
    static HOUSE_CETT_ID = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, "House Venture Building", OTHER_RESOURCES[0], 0, 1);
        HouseCett.HOUSE_CETT_ID++;
    }
}
export class HouseLekal extends House {
    static HOUSE_LEKAL_ID = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, "House Venture Building", METALS_RESOURCES[3], 0, 1);
        HouseLekal.HOUSE_LEKAL_ID++;
    }
}
export class HouseHasting extends House {
    static HOUSE_HASTING_ID = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, "House Venture Building", METALS_RESOURCES[1], 0, 1);
        HouseHasting.HOUSE_HASTING_ID++;
    }
}
export class HouseElariel extends House {
    static HOUSE_ELARIEL_ID = 0;
    constructor(node) {
        super(0, 0, 0, 0, node, "House Venture Building", METALS_RESOURCES[2], 0, 1);
        HouseElariel.HOUSE_ELARIEL_ID++;
    }
}
