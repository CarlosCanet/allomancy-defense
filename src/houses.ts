import { Building } from "./building.js";
import { METALS_RESOURCES, OTHER_RESOURCES, type Resource } from "./allomancyDefenseGame.js";
import type { ResourceMap } from "./game.js";

export interface HouseConstructor {
    new (...args: any[]): House;
    houseName: string;
    howManyBuildings: number;
    getHouseName(): string;
    costToBuild(): ResourceMap;
}

export class House extends Building {
    static houseName: string = "";
    static howManyBuildings: number = 0;
    resource: Resource;
    amountRate: number;
    periodInSec: number;
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, gameBoxNode: HTMLDivElement, name: string, resource: Resource, amountRate: number, periodInSec: number) {
        super(x, y, w, h, node, gameBoxNode, name);
        this.resource = resource;
        this.amountRate = amountRate;
        this.periodInSec = periodInSec;

        const ctor = this.constructor as typeof House;
        ctor.howManyBuildings++;
        node.classList.add("house-building");
        const initialProductivity = 0.5;
        const boostProductivity = 0;
        this.amountRate = initialProductivity * (ctor.howManyBuildings + boostProductivity);
    }

    static costToBuild(): ResourceMap {
        let totalCost = new Map();
        const baseCost = 20;
        const coefficient = 3.5;
        totalCost.set(OTHER_RESOURCES.COINS, baseCost * coefficient ** this.howManyBuildings);
        return totalCost;
    }

    static getHouseName(): string {
        return this.houseName.replaceAll(" ", "");
    }

    destroyHouse = () => {
        const ctor = this.constructor as typeof House;
        ctor.howManyBuildings--;
    }
}

export class HouseVenture extends House {
    static houseName = "House Venture";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Venture Building`, METALS_RESOURCES.STEEL, 0, 2);
        // this.createSpriteArray("../images/houses/House03", "png", 15);
        this.createSpriteArray("../images/houses/House-Gothic01", "png", 1);
    }
}

export class HouseCett extends House {
    static houseName = "House Cett";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Cett Building`, OTHER_RESOURCES.COINS, 0, 1);
        // this.createSpriteArray("../images/houses/House05", "png", 15);
        this.createSpriteArray("../images/houses/House-Gothic02", "png", 1);
    }
}

export class HouseLekal extends House {
    static houseName = "House Lekal";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Lekal Building`, METALS_RESOURCES.TIN, 0, 1);
        // this.createSpriteArray("../images/houses/House01", "png", 1);
        this.createSpriteArray("../images/houses/House-Gothic03", "png", 1);
    }
}

export class HouseHasting extends House {
    static houseName = "House Hasting";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Hasting Building`, METALS_RESOURCES.BRONZE, 0, 1);
        // this.createSpriteArray("../images/houses/House04", "png", 1);
        this.createSpriteArray("../images/houses/House-Gothic04", "png", 1);
    }
}

export class HouseElariel extends House {
    static houseName = "House Elariel";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Elariel Building`, METALS_RESOURCES.COPPER, 0, 1);
        // this.createSpriteArray("../images/houses/House02", "png", 1);
        this.createSpriteArray("../images/houses/House-Gothic05", "png", 1);
    }
}
