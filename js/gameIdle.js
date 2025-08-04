import { Building } from "./building.js";
import { METALS_RESOURCES, RESOURCES } from "./game.js";
import { House, HouseCett, HouseElariel, HouseHasting, HouseLekal, HouseVenture } from "./houses.js";
class MenuSection {
    sectionNode;
    titleNode;
    listNode;
    constructor(title) {
        this.sectionNode = document.createElement("div");
        this.titleNode = document.createElement("h2");
        this.listNode = document.createElement("ul");
        this.listNode.classList.add("ul-menu-list");
        this.listNode.id = `${title}-ul`;
        this.titleNode.innerText = title;
        this.sectionNode.append(this.titleNode);
        this.sectionNode.append(this.listNode);
    }
    addElement(resourceName) {
        this.listNode.innerHTML += `<li class="listMenu" id="${resourceName}-card">${resourceName} <span>0</span></li>`;
    }
    updateAmount(resourceName, amount) {
        const liNode = document.querySelector(`#${resourceName}-card`);
        if (liNode) {
            liNode.innerHTML = `${resourceName} <span>${amount}</span>`;
        }
    }
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
    constructor(gameBoxNode, gameFrequency) {
        this.gameBoxNode = gameBoxNode;
        this.menuNode = document.createElement("div");
        this.menuNode.classList.add("menu");
        this.menuNode.id = "menu-base";
        this.baseButtonsNode = document.createElement("ul");
        this.baseButtonsNode.classList.add("menu-base-list");
        this.baseNode = document.createElement("div");
        this.baseNode.id = "base-ui";
        this.resourcesMenuSectionNode = new MenuSection("Resources");
        this.buildingsMenuSectionNode = new MenuSection("Buildings");
        this.alliesMenuSectionNode = new MenuSection("Allies");
        this.gameFrequency = gameFrequency;
        this.resources = new Map;
        this.buildings = [];
    }
    createBaseUI = () => {
        this.gameBoxNode.append(this.menuNode);
        this.gameBoxNode.append(this.baseNode);
        const h2Node = document.createElement("h2");
        h2Node.innerText = "Menu";
        this.menuNode.append(h2Node);
        this.menuNode.append(this.baseButtonsNode);
        this.baseButtonsNode.append(this.resourcesMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.buildingsMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.alliesMenuSectionNode.sectionNode);
        RESOURCES.forEach((resource) => {
            this.resources.set(resource, 0);
            this.resourcesMenuSectionNode.addElement(resource);
        });
        this.addBuildingButton(HouseVenture);
        this.addBuildingButton(HouseCett);
        this.addBuildingButton(HouseLekal);
        this.addBuildingButton(HouseHasting);
        this.addBuildingButton(HouseElariel);
    };
    addBuildingButton = (HouseClass) => {
        const newLiNode = document.createElement("li");
        newLiNode.classList.add("listMenu");
        newLiNode.id = `${HouseClass.houseName}-building-btn`;
        newLiNode.innerHTML = `${HouseClass.houseName} <span>${HouseClass.howManyBuildings}</span>`;
        newLiNode.addEventListener("click", () => this.addBuilding(HouseClass));
        this.buildingsMenuSectionNode.listNode.append(newLiNode);
    };
    addBuilding = (HouseSubclass) => {
        if (this.buildings.length < 16) {
            const newBuilding = new HouseSubclass(document.createElement("div"));
            newBuilding.node.innerHTML = `<p>${HouseSubclass.houseName}</p><br><p>${newBuilding.resource}</p>`;
            this.buildings.push(newBuilding);
            this.baseNode.append(newBuilding.node);
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
    gameLoop = (tick) => {
        this.buildings.forEach(house => {
            if (tick % ((1000 / this.gameFrequency) * house.periodInSec) === 0) {
                let amount = this.resources.get(house.resource);
                if (amount !== undefined) {
                    this.resources.set(house.resource, amount + 1);
                }
            }
        });
        this.updateResourcesMenu();
    };
}
