import type { Building } from "./building.js";
import { RESOURCES } from "./game.js";
import { MenuSection, type ResourceMap } from "./gameIdle.js";

export class GameIncursion {
    gameBoxNode: HTMLDivElement;
    menuNode: HTMLDivElement;
    baseNode: HTMLDivElement;
    baseButtonsNode: HTMLUListElement;
    resourcesMenuSectionNode: MenuSection;
    alliesMenuSectionNode: MenuSection;
    gameFrequency: number;
    resources: ResourceMap;
    buildings: Array<Building>;
    constructor(gameBoxNode: HTMLDivElement, gameFrequency: number) {
        this.gameBoxNode = gameBoxNode;
        this.menuNode = document.createElement("div");
        this.menuNode.classList.add("menu");
        this.menuNode.id = "menu-incursion";
        this.baseButtonsNode = document.createElement("ul");
        this.baseButtonsNode.classList.add("menu-list");
        this.baseButtonsNode.id = "menu-incursion-list";
        this.baseNode = document.createElement("div");
        this.baseNode.id = "incursion-ui";
        this.resourcesMenuSectionNode = new MenuSection("Resources");
        this.alliesMenuSectionNode = new MenuSection("Allies");

        this.gameFrequency = gameFrequency;
        this.resources = new Map();
        this.buildings = [];
    }

    createIncursionUI = (): void =>  {
            this.gameBoxNode.append(this.menuNode);
            this.gameBoxNode.append(this.baseNode);
            const h2Node = document.createElement("h2");
            h2Node.innerText = "Menu";
            this.menuNode.append(h2Node);
            this.menuNode.append(this.baseButtonsNode);
            this.baseButtonsNode.append(this.resourcesMenuSectionNode.sectionNode);
            this.baseButtonsNode.append(this.alliesMenuSectionNode.sectionNode);
            RESOURCES.forEach((resource) => {
                this.resources.set(resource, 0);
                this.resourcesMenuSectionNode.addElement(resource, resource);
            });
        }
    
}
