import { ALL_RESOURCES, RESOURCE_IMAGES, RESOURCES } from "./allomancyDefenseGame.js";
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
        let innerHTML = "";
        if (this.titleNode.innerText === "Resources") {
            innerHTML = `<img src="./images/resources/icon-${elementText}.png" height="20px"/><span>${elementText}</span> <span id="amount">${amount}</span>`;
        }
        else if (this.titleNode.innerText.startsWith("Buildings")) {
            innerHTML = `<p><span id="amount">${amount}</span> <span>${elementText}</span></p>
            <ul class="building-cost" id="${elementId}-cost"></ul>`;
        }
        else {
            innerHTML = `<p><span id="amount">${amount}</span> <span>${elementText}</span></p>`;
        }
        newLiNode.innerHTML = innerHTML;
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
    createResourcesCost = (buildingId, costResources, actualResources) => {
        const buildingListNode = document.querySelector(`#${buildingId}-cost`);
        buildingListNode && this.createListResources(buildingListNode, costResources, actualResources);
    };
    createListResources = (ulNode, costResources, actualResources) => {
        ulNode.innerHTML = "";
        for (const [resource, amount] of actualResources) {
            let liNode = document.createElement("li");
            let resourceImg = document.createElement("img");
            let amountSpan = document.createElement("span");
            resourceImg.src = RESOURCE_IMAGES[resource].slice(1);
            resourceImg.width = 15;
            let costAmount = costResources.get(resource);
            (costAmount === undefined) && (costAmount = 0);
            if (costAmount > amount) {
                liNode.classList.add("missing");
            }
            amountSpan.innerText = (costAmount !== undefined) ? costAmount.toString() : "0";
            liNode.append(resourceImg);
            liNode.append(amountSpan);
            ulNode.append(liNode);
        }
    };
}
export class Game {
    gameBoxNode;
    menuNode;
    baseNode;
    baseButtonsNode;
    bgMusicNode;
    gameFrequency;
    resources;
    buildings;
    constructor(gameBoxNode, gameFrequency) {
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
    randomIntegerRange = (range, startValue) => Math.floor(Math.random() * range + startValue);
    updateResourcesMenu = () => {
        for (const resource of RESOURCES) {
            const value = this.resources.get(resource);
            if (value !== undefined) {
                this.resourcesMenuSectionNode.updateAmount(resource, value);
            }
        }
    };
    hasPassedAPeriod = (tick, periodInSec) => {
        return (tick % ((1000 / this.gameFrequency) * periodInSec) === 0);
    };
}
