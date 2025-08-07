import { RESOURCES } from "./allomancyDefenseGame.js";
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
