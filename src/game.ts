import { RESOURCES, type Resource } from "./allomancyDefenseGame.js";
import type { Building } from "./building.js";

export type ResourceMap = Map<Resource, number>;

export class MenuSection {
    sectionNode: HTMLDivElement;
    titleNode: HTMLHeadElement;
    listNode: HTMLUListElement;
    liClassName: string;

    constructor(title: string, liClassName: string) {
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

    addElement = (elementId: string, elementText: string, amount: number, event?: keyof HTMLElementEventMap, eventHandler?: () => void) => {
        const newLiNode = document.createElement("li");
        newLiNode.classList.add("listMenu");
        newLiNode.classList.add(this.liClassName);
        newLiNode.id = `${elementId}-btn`;
        if (this.titleNode.innerText === "Resources") {
            newLiNode.innerHTML = `<img src="./images/resources/icon-${elementText}.png" height="20px"/><span>${elementText}</span> <span id="amount">${amount}</span>`
        } else {
            newLiNode.innerHTML = `<span>${elementText}</span> <span id="amount">${amount}</span>`;
        }
        if (event && eventHandler) {
            newLiNode.addEventListener(event, eventHandler);  
        }
        this.listNode.append(newLiNode);
    }

    addElementWithIcon = (elementId: string, elementText: string, amount: number, iconSrc: string, event?: keyof HTMLElementEventMap, eventHandler?: () => void) => {
        const newLiNode = document.createElement("li");
        newLiNode.classList.add("listMenu");
        newLiNode.classList.add(this.liClassName);
        newLiNode.id = `${elementId}-btn`;
        newLiNode.innerHTML = `<img src="${iconSrc}"/><span>${elementText}</span> <span id="amount">${amount}</span>`;
        if (event && eventHandler) {
            newLiNode.addEventListener(event, eventHandler);  
        }
        this.listNode.append(newLiNode);
    }

    updateAmount = (elementName: string, amount: number) => {
        const liNode = this.sectionNode.querySelector<HTMLLIElement>(`#${elementName}-btn #amount`);
        if (liNode) {
            liNode.innerText = `${Math.floor(amount)}`;            
        }
    }
}

export abstract class Game {
    gameBoxNode: HTMLDivElement;
    menuNode: HTMLDivElement;
    baseNode: HTMLDivElement;
    baseButtonsNode: HTMLUListElement;
    abstract resourcesMenuSectionNode: MenuSection;
    gameFrequency: number;
    resources: ResourceMap;
    buildings: Array<Building>;
    
    constructor(gameBoxNode: HTMLDivElement, gameFrequency: number) {
        this.gameBoxNode = gameBoxNode;
        this.menuNode = document.createElement("div");
        this.menuNode.classList.add("menu");
        this.baseButtonsNode = document.createElement("ul");
        this.baseButtonsNode.classList.add("menu-list");
        this.baseNode = document.createElement("div");
        
        this.gameFrequency = gameFrequency;
        this.resources = new Map();
        this.buildings = [];
    }

    randomIntegerRange = (range: number, startValue: number) => Math.floor(Math.random() * range + startValue);

    updateResourcesMenu = () => {
        for (const resource of RESOURCES) {
            const value = this.resources.get(resource);
            if (value !== undefined) {
                this.resourcesMenuSectionNode.updateAmount(resource, value);
            }
        }
    }

    hasPassedAPeriod = (tick: number, periodInSec: number): boolean => {
        return (tick % ((1000 / this.gameFrequency) * periodInSec) === 0);
    }

    abstract gameLoop(tick: number): void;
}