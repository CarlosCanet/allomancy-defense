import { Building } from "./building.js";
import { Character } from "./character.js";
import { METALS_RESOURCES, RESOURCES } from "./game.js";
import { MenuSection } from "./gameIdle.js";
import { House } from "./houses.js";
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
    producerAreas;
    playerCharacter;
    constructor(gameBoxNode, gameFrequency, resources) {
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
        this.resources = resources;
        this.buildings = [];
        this.producerAreas = [];
        this.playerCharacter = new Character(30, 40, 50, 50, document.createElement("div"), gameBoxNode, 5, 5, true);
        this.playerCharacter.node.id = "player-character";
        this.playerCharacter.node.innerText = "PLAYER";
        this.baseNode.append(this.playerCharacter.node);
        this.playerCharacter.render();
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
        setTimeout(this.createArea, 100);
        setTimeout(this.createArea, this.randomIntegerRange(5000, 1000));
    };
    createBuildings = () => {
        const varX = 150, varY = 50, varSize = 0.5;
        const x = 150, y = 80, w = 100, h = 100;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                let dx = Math.floor(Math.random() * varX - varX / 2);
                let dy = Math.floor(Math.random() * varY - varY / 2);
                let ds = (Math.random() * varSize - varSize / 3) + 1;
                let newBuilding = new Building(x + i * 350 + dx, y + j * 200 + dy, w * ds, h * ds, document.createElement("div"), "");
                newBuilding.node.style.width = `${newBuilding.w}px`;
                newBuilding.node.style.height = `${newBuilding.h}px`;
                newBuilding.node.classList.add("static-buildings");
                newBuilding.render();
                this.buildings.push(newBuilding);
                this.baseNode.append(newBuilding.node);
            }
        }
    };
    randomIntegerRange = (range, startValue) => Math.floor(Math.random() * range + startValue);
    createArea = () => {
        const w = 100, h = 100, varSize = 1;
        // const x = Math.floor(Math.random() * (this.baseNode.offsetWidth - w));
        // const y = Math.floor(Math.random() * (this.baseNode.offsetHeight - 2*h));
        const x = this.randomIntegerRange(this.baseNode.offsetWidth - w, 0);
        const y = this.randomIntegerRange(this.baseNode.offsetHeight - 2 * h, 0);
        const ds = (Math.random() * varSize - varSize / 2) + 1;
        const resourceToGenerate = RESOURCES[this.randomIntegerRange(RESOURCES.length, 0)];
        const newArea = new House(x, y, w * ds, h * ds, document.createElement("div"), "", resourceToGenerate, 5, 1);
        newArea.node.style.width = `${newArea.w}px`;
        newArea.node.style.height = `${newArea.h}px`;
        newArea.node.classList.add("area-producer");
        newArea.node.innerText = resourceToGenerate;
        newArea.render();
        this.producerAreas.push(newArea);
        this.baseNode.append(newArea.node);
        setTimeout(() => {
            newArea.node.remove();
            setTimeout(() => this.createArea(), this.randomIntegerRange(20000, 1000));
        }, this.randomIntegerRange(10000, 5000));
    };
    gameLoop = (tick) => {
        this.playerCharacter.render();
    };
}
