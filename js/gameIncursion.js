import { Building } from "./building.js";
import { METALS_RESOURCES, RESOURCES } from "./game.js";
import { MenuSection } from "./gameIdle.js";
export class GameIncursion {
    gameBoxNode;
    menuNode;
    baseNode;
    baseButtonsNode;
    resourcesMenuSectionNode;
    alliesMenuSectionNode;
    gameFrequency;
    resources;
    buildings;
    constructor(gameBoxNode, gameFrequency) {
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
    createIncursionUI = () => {
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
        this.createBuildings();
    };
    createBuildings = () => {
        const varX = 150, varY = 50, varSize = 0.5;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                let x = 150;
                let y = 80;
                let w = 100;
                let h = 100;
                let dx = Math.floor(Math.random() * varX - varX / 2);
                let dy = Math.floor(Math.random() * varY - varY / 2);
                let ds = (Math.random() * varSize - varSize / 3) + 1;
                let newBuilding = new Building(x + i * 350 + dx, y + j * 200 + dy, w * ds, h * ds, document.createElement("div"), "");
                newBuilding.node.style.width = `${newBuilding.w}px`;
                newBuilding.node.style.height = `${newBuilding.h}px`;
                newBuilding.node.classList.add("static-buildings");
                newBuilding.render();
                this.baseNode.append(newBuilding.node);
            }
        }
    };
    gameLoop() { }
}
