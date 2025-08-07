import { OTHER_RESOURCES, RESOURCES } from "./allomancyDefenseGame.js";
import { House, HouseCett, HouseElariel, HouseHasting, HouseLekal, HouseVenture, type HouseConstructor } from "./houses.js";
import { Game, MenuSection } from "./game.js";


export class GameIdle extends Game {
    resourcesMenuSectionNode: MenuSection;
    buildingsMenuSectionNode: MenuSection;
    alliesMenuSectionNode: MenuSection;
    shouldStartIncursion: boolean;
    startIncursionBtnNode: HTMLButtonElement;
    buildings: Array<House>;
    
    constructor(gameBoxNode: HTMLDivElement, gameFrequency: number) {
        super(gameBoxNode, gameFrequency);
        this.menuNode.classList.add("menu");
        this.menuNode.id = "menu-base";
        this.baseButtonsNode.classList.add("menu-list");
        this.baseButtonsNode.id = "menu-base-list";
        this.baseNode.id = "base-ui";
        this.resourcesMenuSectionNode = new MenuSection("Resources", "resources-li");
        this.buildingsMenuSectionNode = new MenuSection("Buildings", "buildings-li");
        this.alliesMenuSectionNode = new MenuSection("Allies", "allies-li");
        this.startIncursionBtnNode = document.createElement("button");

        this.buildings = [];
        this.shouldStartIncursion = false;
    }

    createBaseUI = (): void => {
        this.gameBoxNode.innerHTML = "";
        this.gameBoxNode.append(this.menuNode);
        this.gameBoxNode.append(this.baseNode);
        const h2Node = document.createElement("h2");
        h2Node.innerText = "Menu";
        this.menuNode.append(h2Node);
        this.menuNode.append(this.baseButtonsNode);
        this.baseButtonsNode.append(this.resourcesMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.buildingsMenuSectionNode.sectionNode);
        this.baseButtonsNode.append(this.alliesMenuSectionNode.sectionNode);
        // this.startIncursionNode.addEventListener("click");
        RESOURCES.forEach((resource) => {
            this.resources.set(resource, 0);
            this.resourcesMenuSectionNode.addElement(resource, resource, 0);
        });
        this.addBuildingButton(HouseVenture);
        this.addBuildingButton(HouseCett);
        this.addBuildingButton(HouseLekal);
        this.addBuildingButton(HouseHasting);
        this.addBuildingButton(HouseElariel);
        this.startIncursionBtnNode.innerText = "Start incursion";
        this.startIncursionBtnNode.id = "start-incursion-btn";
        this.startIncursionBtnNode.addEventListener("click", () => this.shouldStartIncursion = true);
        this.menuNode.append((this.startIncursionBtnNode));        
    }

    addBuildingButton = (HouseClass: HouseConstructor): void => {
        this.buildingsMenuSectionNode.addElement(HouseClass.houseName.replaceAll(" ", "-"), HouseClass.houseName, 0, "click", () => this.buyBuilding(HouseClass));
    }

    addBuilding = (HouseSubclass: HouseConstructor): void => {
        if (this.buildings.length < 16) {
            const newBuilding = new HouseSubclass(document.createElement("div"));
            newBuilding.node.innerHTML = `<p>${HouseSubclass.houseName}</p><br><p>${HouseSubclass.howManyBuildings} ${newBuilding.resource}</p>`;            
            this.buildings.push(newBuilding);
            this.baseNode.append(newBuilding.node);
            this.buildingsMenuSectionNode.updateAmount(`${HouseSubclass.houseName.replace(" ", "-")}`, HouseSubclass.howManyBuildings);
        }
    }

    canBuyBuilding = (HouseSubclass: HouseConstructor): boolean => {
        let canBuy = true;
        const resourcesCost = HouseSubclass.costToBuild();
        for (const [resource, amount] of resourcesCost) {
            if (amount > this.resources.get(resource)!) {
                canBuy = false;
                break;
            }
        }
        return canBuy;
    }

    buyBuilding = (HouseSubclass: HouseConstructor): void => {
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
    }

    penalty = (penaltyLevel: number): void => {
        for (let i = 0; i < penaltyLevel; i++) {
            let building2Remove = this.buildings.pop();
            building2Remove && building2Remove.node.remove();
        }
        for (const [resource, amount] of this.resources) {
            let newAmount = amount / 3 * penaltyLevel;
            this.resources.set(resource, newAmount < 0 ? 0 : newAmount);
        }
    }

    gameLoop = (tick: number): void => {
        this.buildings.forEach(house => {
            house.render(tick);
            if (this.hasPassedAPeriod(tick, house.periodInSec)) {
                let amount = this.resources.get(house.resource);
                if (amount !== undefined) {
                    this.resources.set(house.resource, amount + house.amountRate);
                }
            }
        })

        if (this.hasPassedAPeriod(tick, 2)) {
            this.resources.set(OTHER_RESOURCES.COINS, this.resources.get(OTHER_RESOURCES.COINS)! + 10);            
        }
        this.updateResourcesMenu();
    }
}