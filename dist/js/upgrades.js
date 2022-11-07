"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upgrades = void 0;
const types_1 = require("./types");
const utils_1 = require("./utils");
const PRICE_INCREASE = 1.75;
const defaultPrices = {
    perClick: 10,
    perSec: 50,
};
class Upgrades {
    constructor(decreasePrice, getClicks, upgrades) {
        this.decreasePrice = decreasePrice;
        this.getClicks = getClicks;
        this.multiplierPrice = {
            perClick: 1,
            perSec: 1,
        };
        this.start = () => {
            this.setMultiplierPriceFromLS();
            this.showPrices();
            const listenEventButton = (selector, funcOnClick) => {
                (0, utils_1.getElementBySelector)(`${selector} button`).addEventListener('click', funcOnClick);
            };
            listenEventButton(types_1.Selectors.PER_CLICK, () => this.upgrade(types_1.TypesUpgrades.PER_CLICK, 1));
            listenEventButton(types_1.Selectors.PER_SEC, () => this.upgrade(types_1.TypesUpgrades.PER_SEC, 1));
            this.renderUpgrades();
        };
        this.showPrices = () => {
            const showPrice = (selector, price) => {
                (0, utils_1.getElementBySelector)(`${selector} .price`).textContent = String(Math.floor(price));
            };
            showPrice(types_1.Selectors.PER_CLICK, defaultPrices.perClick * this.multiplierPrice.perClick);
            showPrice(types_1.Selectors.PER_SEC, defaultPrices.perSec * this.multiplierPrice.perSec);
        };
        // private upgradeClickSize = (count: number = 1) => {
        //     const totalPrice: number = Math.floor(
        //         defaultPrices.perClick * this.multiplierPricePerClick
        //     )
        //     console.log(totalPrice)
        //     if (this.getClicks() >= totalPrice) {
        //         this.decreasePrice(
        //             defaultPrices.perClick * this.multiplierPricePerClick
        //         )
        //         this.upgrades.clickSize += count
        //         this.multiplierPricePerClick *= PRICE_INCREASE
        //         this.showPrices()
        //         this.renderUpgrades()
        //         setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)
        //         setDataToLocalStorage(LocalStorage.multipliers, {
        //             multiplierPricePerClick: Math.floor(
        //                 this.multiplierPricePerClick
        //             ),
        //             multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
        //         })
        //     } else {
        //         alert('Недостаточно кликов для покупки')
        //     }
        // }
        // private upgradeClicksPerSec = (count: number = 1) => {
        //     const totalPrice: number = Math.floor(
        //         defaultPrices.perSec * this.multiplierPricePerSec
        //     )
        //     if (this.getClicks() >= totalPrice) {
        //         this.decreasePrice(totalPrice)
        //         this.upgrades.clicksPerSecond += count
        //         this.multiplierPricePerSec *= PRICE_INCREASE
        //         this.showPrices()
        //         this.renderUpgrades()
        //         setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)
        //         setDataToLocalStorage(LocalStorage.multipliers, {
        //             multiplierPricePerClick: Math.floor(
        //                 this.multiplierPricePerClick
        //             ),
        //             multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
        //         })
        //     } else {
        //         alert('Недостаточно кликов для покупки')
        //     }
        // }
        this.upgrade = (type, count) => {
            const totalPrice = Math.floor(type === types_1.TypesUpgrades.PER_CLICK
                ? defaultPrices.perClick * this.multiplierPrice.perClick
                : defaultPrices.perSec * this.multiplierPrice.perSec);
            if (this.getClicks() >= totalPrice) {
                this.decreasePrice(totalPrice);
                if (type === types_1.TypesUpgrades.PER_CLICK) {
                    this.upgrades.clickSize += count;
                    this.multiplierPrice.perClick *= PRICE_INCREASE;
                }
                else {
                    this.upgrades.clicksPerSecond += count;
                    this.multiplierPrice.perSec *= PRICE_INCREASE;
                }
                this.showPrices();
                this.renderUpgrades();
                (0, utils_1.setDataToLocalStorage)(utils_1.LocalStorage.UPGRADES, this.upgrades);
                (0, utils_1.setDataToLocalStorage)(utils_1.LocalStorage.MULTIPLIER_PRICE, {
                    multiplierPricePerClick: Math.floor(this.multiplierPrice.perClick),
                    multiplierPricePerSec: Math.floor(this.multiplierPrice.perSec),
                });
            }
            else {
                alert('Недостаточно кликов для покупки');
            }
        };
        this.renderUpgrades = () => {
            (0, utils_1.getElementBySelector)('#counterPerClick').textContent =
                String(this.upgrades.clickSize);
            (0, utils_1.getElementBySelector)('#counterPerSec').textContent =
                String(this.upgrades.clicksPerSecond);
        };
        this.setMultiplierPriceFromLS = () => {
            const dataFromLS = (0, utils_1.getDataFromLocalStorage)(utils_1.LocalStorage.MULTIPLIER_PRICE);
            if (dataFromLS) {
                this.multiplierPrice.perClick = dataFromLS.multiplierPricePerClick;
                this.multiplierPrice.perSec = dataFromLS.multiplierPricePerSec;
            }
            // const { multPricePerClick, multPricePerSec } =
        };
        this.upgrades = upgrades;
    }
}
exports.Upgrades = Upgrades;
