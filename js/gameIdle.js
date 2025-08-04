import { Building } from "./building.js";
import { METALS_RESOURCES, RESOURCES } from "./game.js";
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
            liNode.innerText = `${resourceName}<span>${amount}</span>`;
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
    resources;
    buildings;
    constructor(gameBoxNode) {
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
    };
    addBuilding = () => {
        this.buildings.push(new Building(0, 0, 0, 0, document.querySelector("div"), "Venture", METALS_RESOURCES[0], 0, 3));
    };
    gameLoop = (tick) => {
        // console.log(`Hola`);
    };
}
