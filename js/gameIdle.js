import { Building } from "./building.js";
import { METALS_RESOURCES, OTHER_RESOURCES, RESOURCES } from "./game.js";
import { GameIncursion } from "./gameIncursion.js";
import { House, HouseCett, HouseElariel, HouseHasting, HouseLekal, HouseVenture } from "./houses.js";
export class MenuSection {
    sectionNode;
    titleNode;
    listNode;
    liClassName;
    constructor(title, liClassName) {
        this.sectionNode = document.createElement("div");
        this.titleNode = document.createElement("h2");
        this.listNode = document.createElement("ul");
        this.listNode.classList.add("ul-menu-list");
        this.listNode.id = `${title}-ul`;
        this.titleNode.innerText = title;
        this.sectionNode.append(this.titleNode);
        this.sectionNode.append(this.listNode);
        this.liClassName = liClassName;
    }
    addElement = (elementId, elementText, amount, event, eventHandler) => {
        const newLiNode = document.createElement("li");
        newLiNode.classList.add("listMenu");
        newLiNode.classList.add(this.liClassName);
        newLiNode.id = `${elementId}-btn`;
        if (this.titleNode.innerText === "Resources") {
            newLiNode.innerHTML = `<img src="./images/resources/icon-${elementText}.png" height="20px"/><span>${elementText}</span> <span id="amount">${amount}</span>`;
        }
        else {
            newLiNode.innerHTML = `<span>${elementText}</span> <span id="amount">${amount}</span>`;
        }
        if (event && eventHandler) {
            newLiNode.addEventListener(event, eventHandler);
        }
        this.listNode.append(newLiNode);
    };
    addElementWithIcon = (elementId, elementText, amount, iconSrc, event, eventHandler) => {
        const newLiNode = document.createElement("li");
        newLiNode.classList.add("listMenu");
        newLiNode.classList.add(this.liClassName);
        newLiNode.id = `${elementId}-btn`;
        newLiNode.innerHTML = `<img src="${iconSrc}"/><span>${elementText}</span> <span id="amount">${amount}</span>`;
        if (event && eventHandler) {
            newLiNode.addEventListener(event, eventHandler);
        }
        this.listNode.append(newLiNode);
    };
    updateAmount = (elementName, amount) => {
        const liNode = this.sectionNode.querySelector(`#${elementName}-btn #amount`);
        if (liNode) {
            liNode.innerText = `${Math.floor(amount)}`;
        }
    };
}
export class GameIdle {
    gameBoxNode;
    menuNode;
    baseNode;
    baseButtonsNode;
    resourcesMenuSectionNode;
    buildingsMenuSectionNode;
    alliesMenuSectionNode;
    gameFrequency;
    resources;
    buildings;
    shouldStartIncursion;
    startIncursionBtnNode;
    constructor(gameBoxNode, gameFrequency) {
        this.gameBoxNode = gameBoxNode;
        this.menuNode = document.createElement("div");
        this.menuNode.classList.add("menu");
        this.menuNode.id = "menu-base";
        this.baseButtonsNode = document.createElement("ul");
        this.baseButtonsNode.classList.add("menu-list");
        this.baseButtonsNode.id = "menu-base-list";
        this.baseNode = document.createElement("div");
        this.baseNode.id = "base-ui";
        this.resourcesMenuSectionNode = new MenuSection("Resources", "resources-li");
        this.buildingsMenuSectionNode = new MenuSection("Buildings", "buildings-li");
        this.alliesMenuSectionNode = new MenuSection("Allies", "allies-li");
        this.startIncursionBtnNode = document.createElement("button");
        this.gameFrequency = gameFrequency;
        this.resources = new Map();
        this.buildings = [];
        this.shouldStartIncursion = false;
    }
    createBaseUI = () => {
        this.gameBoxNode.innerHTML = "";
        this.gameBoxNode.append(this.menuNode);
        this.gameBoxNode.append(this.baseNode);
        const h2Node = document.createElement("h2");
        h2Node.innerText = "Menu";
        this.menuNode.append(h2Node);
        this.menuNode.append(this.baseButtonsNode);
        this.baseButtonsNode.append(this.resourcesMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.buildingsMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.alliesMenuSectionNode.sectionNode);
        // this.startIncursionNode.addEventListener("click");
        RESOURCES.forEach((resource) => {
            this.resources.set(resource, 0);
            this.resourcesMenuSectionNode.addElement(resource, resource, 0);
        });
        this.addBuildingButton(HouseVenture);
        this.addBuildingButton(HouseCett);
        this.addBuildingButton(HouseLekal);
        this.addBuildingButton(HouseHasting);
        this.addBuildingButton(HouseElariel);
        this.startIncursionBtnNode.innerText = "Start incursion";
        this.startIncursionBtnNode.id = "start-incursion-btn";
        this.startIncursionBtnNode.addEventListener("click", () => this.shouldStartIncursion = true);
        this.menuNode.append((this.startIncursionBtnNode));
    };
    addBuildingButton = (HouseClass) => {
        this.buildingsMenuSectionNode.addElement(HouseClass.houseName.replaceAll(" ", "-"), HouseClass.houseName, 0, "click", () => this.buyBuilding(HouseClass));
    };
    addBuilding = (HouseSubclass) => {
        if (this.buildings.length < 16) {
            const newBuilding = new HouseSubclass(document.createElement("div"));
            newBuilding.node.innerHTML = `<p>${HouseSubclass.houseName}</p><br><p>${HouseSubclass.howManyBuildings} ${newBuilding.resource}</p>`;
            this.buildings.push(newBuilding);
            this.baseNode.append(newBuilding.node);
            this.buildingsMenuSectionNode.updateAmount(`${HouseSubclass.houseName.replace(" ", "-")}`, HouseSubclass.howManyBuildings);
        }
    };
    updateResourcesMenu = () => {
        for (const resource of RESOURCES) {
            const value = this.resources.get(resource);
            if (value !== undefined) {
                this.resourcesMenuSectionNode.updateAmount(resource, value);
            }
        }
    };
    canBuyBuilding = (HouseSubclass) => {
        let canBuy = true;
        const resourcesCost = HouseSubclass.costToBuild();
        for (const [key, value] of resourcesCost) {
            if (value > this.resources.get(key)) {
                canBuy = false;
                break;
            }
        }
        return canBuy;
    };
    buyBuilding = (HouseSubclass) => {
        if (this.canBuyBuilding(HouseSubclass)) {
            const resourcesCost = HouseSubclass.costToBuild();
            for (const [key, value] of resourcesCost.entries()) {
                const myResourcesValue = this.resources.get(key);
                if (myResourcesValue !== undefined) {
                    this.resources.set(key, myResourcesValue - value);
                }
            }
            this.addBuilding(HouseSubclass);
        }
    };
    hasPassedAPeriod = (tick, periodInSec) => {
        return (tick % ((1000 / this.gameFrequency) * periodInSec) === 0);
    };
    gameLoop = (tick) => {
        this.buildings.forEach(house => {
            house.render(tick);
            if (this.hasPassedAPeriod(tick, house.periodInSec)) {
                let amount = this.resources.get(house.resource);
                if (amount !== undefined) {
                    this.resources.set(house.resource, amount + house.amountRate);
                }
            }
        });
        if (this.hasPassedAPeriod(tick, 2)) {
            this.resources.set(OTHER_RESOURCES.COINS, this.resources.get(OTHER_RESOURCES.COINS) + 10);
        }
        this.updateResourcesMenu();
    };
}
