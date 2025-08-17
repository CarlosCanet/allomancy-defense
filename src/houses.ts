import { Building } from "./building.js";
import { METALS_RESOURCES, OTHER_RESOURCES, RESOURCE_IMAGES, type Resource } from "./allomancyDefenseGame.js";
import type { ResourceMap } from "./game.js";

export interface HouseConstructor {
    new (...args: any[]): House;
    houseName: string;
    howManyBuildings: number;
    getHouseName(): string;
    costToBuild(): ResourceMap;
    canBuildNewOne(actualResources: ResourceMap): boolean;
    updateButtonDOM(actualResources: ResourceMap): void;
}

export class House extends Building {
    static houseName: string = "";
    static howManyBuildings: number = 0;
    // buttonNode: HTMLDivElement;
    resource: Resource;
    maxAmountRate: number;
    amountRate: number;
    periodInSec: number;
    tickStartProducing: number;
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement, gameBoxNode: HTMLDivElement, name: string, resource: Resource, maxAmountRate: number, periodInSec: number) {
        super(x, y, w, h, node, gameBoxNode, name);
        this.resource = resource;
        this.maxAmountRate = maxAmountRate;
        this.periodInSec = periodInSec;
        this.tickStartProducing = 0;

        const ctor = this.constructor as typeof House;
        ctor.howManyBuildings++;
        node.classList.add("house-building");
        const boostProductivity = 0;
        this.maxAmountRate = maxAmountRate + (ctor.howManyBuildings * boostProductivity);
        this.amountRate = this.maxAmountRate;
    }

    static costToBuild(): ResourceMap {
        let totalCost = new Map();
        const baseCost = 20;
        const coefficient = 3.5;
        totalCost.set(OTHER_RESOURCES.COINS, Math.floor(baseCost * coefficient ** this.howManyBuildings));
        return totalCost;
    }

    static canBuildNewOne(actualResources: ResourceMap): boolean {
        let canBuy = true;
        const resourcesCost = this.costToBuild();
        for (const [resource, amount] of resourcesCost) {
            if (amount > actualResources.get(resource)!) {
                canBuy = false;
                break;
            }
        }
        return canBuy;
    }

    static getHouseName(): string {
        return this.houseName.replaceAll(" ", "");
    }


    destroyHouse = (): void => {
        const ctor = this.constructor as typeof House;
        ctor.howManyBuildings--;
    }

    updateTickStartProducing = (tick: number): void => {
        this.tickStartProducing = tick;
    }

    updateRate = (actualTick: number, gameFrequency: number, maxSecondsUntilIncursion: number): void => {
        const ticksGeneratingIteration = actualTick - this.tickStartProducing;
        const secondsGenerating = ticksGeneratingIteration / 1000 * gameFrequency;
        const penaltyRate = this.maxAmountRate / maxSecondsUntilIncursion * secondsGenerating;
        const rate = this.maxAmountRate - penaltyRate;
        this.amountRate = (rate < 0) ? 0 : rate;
    }

    updateRateDOM = (): void => {
        const buildingNode = this.node.querySelector(".building-rate");
        if (buildingNode) {
            buildingNode.innerHTML = `+${this.amountRate.toFixed(2)} <img src=${RESOURCE_IMAGES[this.resource].slice(1)} height="15px"/>/s`;
        }
    }

    createBuildingDOM = (): void => {
       
    }

    createButtonDOM = (): string => {
        const ctor = this.constructor as typeof House;

        return `<p><span id="amount">${ctor.howManyBuildings}</span> <span>${ctor.getHouseName()}</span> <img src="${RESOURCE_IMAGES[this.resource].slice(1)}"/></p>
        <ul class="building-cost" id="${this.name}-cost"></ul>`
    }

    static updateButtonDOM(actualResources: ResourceMap): void {
        const buildingListNode = document.querySelector(`#${this.getHouseName()}-cost`) as HTMLUListElement;
        if (buildingListNode) {
            const costResources = this.costToBuild();
            buildingListNode.innerHTML = "";
            for (const [resource, amount] of actualResources) {
                const liNode = document.createElement("li");
                const resourceImg = document.createElement("img");
                const amountSpan = document.createElement("span");

                resourceImg.src = RESOURCE_IMAGES[resource].slice(1);
                resourceImg.width = 15;

                let costAmount = costResources.get(resource) ?? 0;
                if (costAmount > amount) {
                    liNode.classList.add("missing");
                }

                amountSpan.innerText = (costAmount !== undefined) ? costAmount.toString() : "0";
                
                liNode.append(resourceImg);
                liNode.append(amountSpan);
                buildingListNode.append(liNode);
            }
        }
    }

}

export class HouseVenture extends House {
    static houseName = "House Venture";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Venture Building`, METALS_RESOURCES.STEEL, 5, 2);
        this.createSpriteArray("./images/houses/House-Gothic01", "png", 1);
    }
}

export class HouseCett extends House {
    static houseName = "House Cett";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Cett Building`, OTHER_RESOURCES.COINS, 6, 1);
        this.createSpriteArray("./images/houses/House-Gothic02", "png", 1);
    }
}

export class HouseLekal extends House {
    static houseName = "House Lekal";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Lekal Building`, METALS_RESOURCES.TIN, 3, 1);
        this.createSpriteArray("./images/houses/House-Gothic03", "png", 1);
    }
}

export class HouseHasting extends House {
    static houseName = "House Hasting";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Hasting Building`, METALS_RESOURCES.BRONZE, 2, 1);
        this.createSpriteArray("./images/houses/House-Gothic04", "png", 1);
    }
}

export class HouseElariel extends House {
    static houseName = "House Elariel";
    static howManyBuildings: number = 0;
    constructor(node: HTMLDivElement, gameBoxNode: HTMLDivElement) {
        super(0, 0, 0, 0, node, gameBoxNode, `House Elariel Building`, METALS_RESOURCES.COPPER, 2, 1);
        this.createSpriteArray("./images/houses/House-Gothic05", "png", 1);
    }
}
