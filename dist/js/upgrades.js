"use strict";
var selectors;
(function (selectors) {
    selectors["perSec"] = "#per-sec";
    selectors["perClick"] = "#per-click";
})(selectors || (selectors = {}));
var typesUpgrades;
(function (typesUpgrades) {
    typesUpgrades["perClick"] = "perClick";
    typesUpgrades["perSec"] = "perSec";
})(typesUpgrades || (typesUpgrades = {}));
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
                getElementBySelector(`${selector} button`).addEventListener('click', funcOnClick);
            };
            listenEventButton(selectors.perClick, () => this.upgrade(typesUpgrades.perClick, 1));
            listenEventButton(selectors.perSec, () => this.upgrade(typesUpgrades.perSec, 1));
            this.renderUpgrades();
        };
        this.showPrices = () => {
            const showPrice = (selector, price) => {
                getElementBySelector(`${selector} .price`).textContent = String(Math.floor(price));
            };
            showPrice(selectors.perClick, defaultPrices.perClick * this.multiplierPrice.perClick);
            showPrice(selectors.perSec, defaultPrices.perSec * this.multiplierPrice.perSec);
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
            const totalPrice = Math.floor(type === typesUpgrades.perClick
                ? defaultPrices.perClick * this.multiplierPrice.perClick
                : defaultPrices.perSec * this.multiplierPrice.perSec);
            if (this.getClicks() >= totalPrice) {
                this.decreasePrice(totalPrice);
                if (type === typesUpgrades.perClick) {
                    this.upgrades.clickSize += count;
                    this.multiplierPrice.perClick *= PRICE_INCREASE;
                }
                else {
                    this.upgrades.clicksPerSecond += count;
                    this.multiplierPrice.perSec *= PRICE_INCREASE;
                }
                this.showPrices();
                this.renderUpgrades();
                setDataToLocalStorage(LocalStorage.upgrades, this.upgrades);
                setDataToLocalStorage(LocalStorage.multiplierPrice, {
                    multiplierPricePerClick: Math.floor(this.multiplierPrice.perClick),
                    multiplierPricePerSec: Math.floor(this.multiplierPrice.perSec),
                });
            }
            else {
                alert('Недостаточно кликов для покупки');
            }
        };
        this.renderUpgrades = () => {
            getElementBySelector('#counterPerClick').textContent = String(this.upgrades.clickSize);
            getElementBySelector('#counterPerSec').textContent = String(this.upgrades.clicksPerSecond);
        };
        this.setMultiplierPriceFromLS = () => {
            const dataFromLS = getDataFromLocalStorage(LocalStorage.multiplierPrice);
            if (dataFromLS) {
                this.multiplierPrice.perClick = dataFromLS.multiplierPricePerClick;
                this.multiplierPrice.perSec = dataFromLS.multiplierPricePerSec;
            }
            // const { multPricePerClick, multPricePerSec } =
        };
        this.upgrades = upgrades;
    }
}
