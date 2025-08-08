import { OTHER_RESOURCES, RESOURCE_IMAGES, RESOURCES } from "./allomancyDefenseGame.js";
import { House, HouseCett, HouseElariel, HouseHasting, HouseLekal, HouseVenture } from "./houses.js";
import { Game, MenuSection } from "./game.js";
const HousesMap = { HouseVenture, HouseCett, HouseLekal, HouseHasting, HouseElariel };
export class GameIdle extends Game {
    resourcesMenuSectionNode;
    buildingsMenuSectionNode;
    // alliesMenuSectionNode: MenuSection;  // TODO future allies
    shouldStartIncursion;
    startIncursionBtnNode;
    ticksGeneratingIteration;
    maxSecondsUntilIncursion;
    buildings;
    constructor(gameBoxNode, gameFrequency) {
        super(gameBoxNode, gameFrequency);
        this.menuNode.classList.add("menu");
        this.menuNode.id = "menu-base";
        this.baseButtonsNode.classList.add("menu-list");
        this.baseButtonsNode.id = "menu-base-list";
        this.baseNode.id = "base-ui";
        this.resourcesMenuSectionNode = new MenuSection("Resources", "resources-li");
        this.buildingsMenuSectionNode = new MenuSection("Buildings", "buildings-li");
        // this.alliesMenuSectionNode = new MenuSection("Allies", "allies-li");  // TODO future allies
        this.startIncursionBtnNode = document.createElement("button");
        this.ticksGeneratingIteration = 0;
        this.maxSecondsUntilIncursion = 60;
        this.buildings = [];
        this.buildingsMenuSectionNode.titleNode.innerText = `Buildings (${this.buildings.length}/16)`;
        this.shouldStartIncursion = false;
    }
    createBaseUI = () => {
        this.gameBoxNode.innerHTML = "";
        this.gameBoxNode.append(this.menuNode);
        this.gameBoxNode.append(this.baseNode);
        this.gameBoxNode.append(this.bgMusicNode);
        const h2Node = document.createElement("h2");
        h2Node.innerText = "Menu";
        this.menuNode.append(h2Node);
        this.menuNode.append(this.baseButtonsNode);
        this.baseButtonsNode.append(this.resourcesMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.buildingsMenuSectionNode.sectionNode);
        // this.baseButtonsNode.append(this.alliesMenuSectionNode.sectionNode);  // TODO future allies
        RESOURCES.forEach((resource) => {
            let localStorageResource = localStorage.getItem(resource);
            let amount = (resource === OTHER_RESOURCES.COINS) ? 130 : 0;
            if (localStorageResource) {
                amount = parseInt(localStorageResource);
            }
            this.resources.set(resource, amount);
            this.resourcesMenuSectionNode.addElement(resource, resource, 0);
        });
        for (let index = 0; index < 16; index++) {
            let houseClassName = localStorage.getItem(`building-${index}`);
            if (houseClassName) {
                const HouseClass = HousesMap[houseClassName];
                this.addBuilding(HouseClass);
            }
        }
        this.addBuildingButton(HouseVenture);
        this.addBuildingButton(HouseCett);
        this.addBuildingButton(HouseLekal);
        this.addBuildingButton(HouseHasting);
        this.addBuildingButton(HouseElariel);
        this.startIncursionBtnNode.innerText = "Start incursion";
        this.startIncursionBtnNode.id = "start-incursion-btn";
        this.startIncursionBtnNode.addEventListener("click", () => this.shouldStartIncursion = true);
        this.menuNode.append((this.startIncursionBtnNode));
        this.bgMusicNode.src = "./sfx/backgroundMusic-idle-DeusLower.mp3";
        this.bgMusicNode.loop = true;
        this.bgMusicNode.autoplay = true;
        this.bgMusicNode.volume = 0.3;
    };
    addBuildingButton = (HouseClass) => {
        const houseName = HouseClass.getHouseName();
        this.buildingsMenuSectionNode.addElement(houseName, HouseClass.houseName, HouseClass.howManyBuildings, "click", () => this.buyBuilding(HouseClass));
        this.buildingsMenuSectionNode.createResourcesCost(houseName, HouseClass.costToBuild(), this.resources);
    };
    addBuilding = (HouseSubclass) => {
        if (this.buildings.length < 16) {
            const newBuilding = new HouseSubclass(document.createElement("div"));
            this.buildings.push(newBuilding);
            this.baseNode.append(newBuilding.node);
            newBuilding.node.innerHTML = `<p>${newBuilding.constructor.houseName}</p>
            <br><p class="building-rate">+${newBuilding.amountRate.toFixed(2)} <img src=${RESOURCE_IMAGES[newBuilding.resource]} height="15px"/>/s</p>`;
            this.buildingsMenuSectionNode.updateAmount(`${HouseSubclass.getHouseName()}`, HouseSubclass.howManyBuildings);
            const buildingTitle = this.buildingsMenuSectionNode.titleNode.innerText.split(" ")[0];
            this.buildingsMenuSectionNode.titleNode.innerText = `${buildingTitle} (${this.buildings.length}/16)`;
            this.buildingsMenuSectionNode.createResourcesCost(newBuilding.constructor.name, HouseSubclass.costToBuild(), this.resources);
        }
    };
    updateRateBuilding = (building, amountRate) => {
        const buildingNode = building.node.querySelector(".building-rate");
        if (buildingNode) {
            buildingNode.innerHTML = `+${amountRate.toFixed(2)} <img src=${RESOURCE_IMAGES[building.resource]} height="15px"/>/s`;
        }
    };
    removeLastBuilding = () => {
        let building2Remove = this.buildings.pop();
        if (building2Remove) {
            const classOfBuilding = building2Remove.constructor;
            this.buildingsMenuSectionNode.updateAmount(classOfBuilding.getHouseName(), classOfBuilding.howManyBuildings);
            building2Remove.node.remove();
            building2Remove.destroyHouse();
            const buildingTitle = this.buildingsMenuSectionNode.titleNode.innerText.split(" ")[0];
            this.buildingsMenuSectionNode.titleNode.innerText = `${buildingTitle} (${this.buildings.length}/16)`;
        }
    };
    canBuyBuilding = (HouseSubclass) => {
        let canBuy = true;
        const resourcesCost = HouseSubclass.costToBuild();
        for (const [resource, amount] of resourcesCost) {
            if (amount > this.resources.get(resource)) {
                canBuy = false;
                break;
            }
        }
        return canBuy;
    };
    buyBuilding = (HouseSubclass) => {
        if (this.canBuyBuilding(HouseSubclass)) {
            const resourcesCost = HouseSubclass.costToBuild();
            for (const [resource, amount] of resourcesCost.entries()) {
                const myResourcesValue = this.resources.get(resource);
                if (myResourcesValue !== undefined) {
                    this.resources.set(resource, myResourcesValue - amount);
                }
            }
            this.addBuilding(HouseSubclass);
        }
    };
    penalty = (penaltyLevel) => {
        for (let i = 0; i < penaltyLevel; i++) {
            this.removeLastBuilding();
        }
        for (const [resource, amount] of this.resources) {
            let newAmount = amount / 3 * penaltyLevel;
            this.resources.set(resource, newAmount < 0 ? 0 : newAmount);
        }
    };
    saveGameIdleInLocalStorage = () => {
        for (const [resource, amount] of this.resources) {
            localStorage.setItem(resource, amount.toString());
        }
        this.buildings.forEach((building, index) => localStorage.setItem(`building-${index}`, building.constructor.name));
    };
    gameLoop = (tick) => {
        // Buildings generate resources
        this.ticksGeneratingIteration++;
        this.buildings.forEach(house => {
            house.render(tick);
            if (this.hasPassedAPeriod(tick, house.periodInSec)) {
                let amount = this.resources.get(house.resource);
                if (amount !== undefined) {
                    let secondsGenerating = this.ticksGeneratingIteration / 1000 * this.gameFrequency;
                    let penaltyRate = house.amountRate / this.maxSecondsUntilIncursion * secondsGenerating;
                    let rate = house.amountRate - penaltyRate;
                    this.resources.set(house.resource, amount + ((rate < 0) ? 0 : rate));
                    this.updateRateBuilding(house, rate);
                }
            }
        });
        // Free resources (coins)
        // if (this.hasPassedAPeriod(tick, 2)) {
        //     this.resources.set(OTHER_RESOURCES.COINS, this.resources.get(OTHER_RESOURCES.COINS)! + 10);            
        // }
        // Update UI
        this.updateResourcesMenu();
        // Save resources in local storage each 5 secs
        if (this.hasPassedAPeriod(tick, 5)) {
            this.saveGameIdleInLocalStorage();
        }
    };
}
