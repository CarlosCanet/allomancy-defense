import { Building } from "./building.js";
import { METALS_RESOURCES, RESOURCES, type Resource } from "./game.js";
import { House, HouseCett, HouseElariel, HouseHasting, HouseLekal, HouseVenture, type HouseConstructor } from "./houses.js";

class MenuSection {
    sectionNode: HTMLDivElement;
    titleNode: HTMLHeadElement;
    listNode: HTMLUListElement;

    constructor(title: string) {
        this.sectionNode = document.createElement("div");
        this.titleNode = document.createElement("h2");
        this.listNode = document.createElement("ul");
        this.listNode.classList.add("ul-menu-list");
        this.listNode.id = `${title}-ul`;
        this.titleNode.innerText = title;
        this.sectionNode.append(this.titleNode);
        this.sectionNode.append(this.listNode);
    }

    addElement(resourceName: string) {
        this.listNode.innerHTML += `<li class="listMenu" id="${resourceName}-card">${resourceName} <span>0</span></li>`;
    }

    updateAmount(resourceName: string, amount: number) {
        const liNode = document.querySelector<HTMLLIElement>(`#${resourceName}-card`);
        if (liNode) {
            liNode.innerHTML = `${resourceName} <span>${amount}</span>`;            
        }
    }
}

export class GameIdle {
    gameBoxNode: HTMLDivElement;
    menuNode: HTMLDivElement;
    baseNode: HTMLDivElement;
    baseButtonsNode: HTMLUListElement;
    resourcesMenuSectionNode: MenuSection;
    buildingsMenuSectionNode: MenuSection;
    alliesMenuSectionNode: MenuSection;
    gameFrequency: number;
    resources: Map<Resource, number>;
    buildings: Array<Building>;
    
    constructor(gameBoxNode: HTMLDivElement, gameFrequency: number) {
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
        this.resources = new Map<Resource, number>;
        this.buildings = [];
    }

    createBaseUI = (): void =>  {
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
    }

    addBuildingButton = (HouseClass: HouseConstructor): void => {
        const newLiNode = document.createElement("li");
        newLiNode.classList.add("listMenu");
        newLiNode.id = `${HouseClass.houseName}-building-btn`;
        newLiNode.innerHTML = `${HouseClass.houseName} <span>${HouseClass.howManyBuildings}</span>`;
        newLiNode.addEventListener("click", () => this.addBuilding(HouseClass));
        this.buildingsMenuSectionNode.listNode.append(newLiNode);
    }

    addBuilding = (HouseSubclass: HouseConstructor): void => {
        if (this.buildings.length < 16) {
            const newBuilding = new HouseSubclass(document.createElement("div"));
            newBuilding.node.innerHTML = `<p>${HouseSubclass.houseName}</p><br><p>${newBuilding.resource}</p>`;            
            this.buildings.push(newBuilding);
            this.baseNode.append(newBuilding.node);
        }
    }

    updateResourcesMenu = () => {
        for (const resource of RESOURCES) {
            const value = this.resources.get(resource);
            if (value !== undefined) {
                this.resourcesMenuSectionNode.updateAmount(resource, value);
            }
        }
    }

    gameLoop = (tick: number): void => {
        this.buildings.forEach(house => {
            if (tick % ((1000 / this.gameFrequency) * house.periodInSec) === 0) {
                let amount = this.resources.get(house.resource);
                if (amount !== undefined) {
                    this.resources.set(house.resource, amount+1);
                }
            }
        })
        this.updateResourcesMenu();
    }
}