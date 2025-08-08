import { ALL_RESOURCES, RESOURCE_IMAGES, RESOURCES, type Resource } from "./allomancyDefenseGame.js";
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

    addElement = (elementId: string, elementText: string, amount: number, event?: keyof HTMLElementEventMap, eventHandler?: () => void): void => {
        const newLiNode = document.createElement("li");
        newLiNode.classList.add("listMenu");
        newLiNode.classList.add(this.liClassName);
        newLiNode.id = `${elementId}-btn`;
        let innerHTML = "";
        if (this.titleNode.innerText === "Resources") {
            innerHTML = `<img src="./images/resources/icon-${elementText}.png" height="20px"/><span>${elementText}</span> <span id="amount">${amount}</span>`
        } else if (this.titleNode.innerText.startsWith("Buildings")) {
            innerHTML = `<p><span>${elementText}</span> <span id="amount">${amount}</span></p>
            <ul class="building-cost" id="${elementId}-cost"></ul>`;
        } else {
            innerHTML = `<p><span>${elementText}</span> <span id="amount">${amount}</span></p>`;
        }
        newLiNode.innerHTML = innerHTML;
        if (event && eventHandler) {
            newLiNode.addEventListener(event, eventHandler);  
        }
        this.listNode.append(newLiNode);
    }

    addElementWithIcon = (elementId: string, elementText: string, amount: number, iconSrc: string, event?: keyof HTMLElementEventMap, eventHandler?: () => void): void => {
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

    updateAmount = (elementName: string, amount: number): void => {
        const liNode = this.sectionNode.querySelector<HTMLLIElement>(`#${elementName}-btn #amount`);
        if (liNode) {
            liNode.innerText = `${Math.floor(amount)}`;            
        }
    }

    createResourcesCost = (buildingId: string, costResources: ResourceMap, actualResources: ResourceMap): void => {
        const buildingListNode = document.querySelector(`#${buildingId}-cost`);
        for (const [resource, amount] of actualResources) {
            let liNode = document.createElement("li");
            let resourceImg = document.createElement("img");
            let amountSpan = document.createElement("span");

            resourceImg.src = RESOURCE_IMAGES[resource];
            resourceImg.width = 15;

            let costAmount = costResources.get(resource);
            (costAmount === undefined) && (costAmount = 0);
            if (costAmount > amount) {
                liNode.classList.add("missing");
            }

            amountSpan.innerText = (costAmount !== undefined) ? costAmount.toString() : "0";
            
            liNode.append(resourceImg);
            liNode.append(amountSpan);
            buildingListNode?.append(liNode);
        }
    }

    updateResourcesCost = (buildingId: string, costResources: ResourceMap, actualResources: ResourceMap): void => {
        const buildingListNode = document.querySelector(`#${buildingId}-cost`);
        for (const [resource, amount] of actualResources) {
            let liNode = document.querySelector("li");
            let resourceImg = document.querySelector("img");
            let amountSpan = document.querySelector("span");
            if (liNode && resourceImg && amountSpan) {
                let costAmount = costResources.get(resource);
                (costAmount === undefined) && (costAmount = 0);
                if (costAmount > amount) {
                    liNode.classList.add("missing");
                } else {
                    liNode.classList.remove("missing");
                }
    
                amountSpan.innerText = (costAmount !== undefined) ? costAmount.toString() : "0";
            }
        }
    }
}

export abstract class Game {
    gameBoxNode: HTMLDivElement;
    menuNode: HTMLDivElement;
    baseNode: HTMLDivElement;
    baseButtonsNode: HTMLUListElement;
    bgMusicNode: HTMLAudioElement;
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
        this.bgMusicNode = document.createElement("audio");
        this.resources = new Map();
        this.buildings = [];
    }

    randomIntegerRange = (range: number, startValue: number): number => Math.floor(Math.random() * range + startValue);

    updateResourcesMenu = (): void => {
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