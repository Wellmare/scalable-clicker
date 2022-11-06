"use strict";
var selectors;
(function (selectors) {
    selectors["perSec"] = "#per-sec";
    selectors["perClick"] = "#per-click";
})(selectors || (selectors = {}));
const PRICE_INCREASE = 1.75;
const defaultPrices = {
    perClick: 10,
    perSec: 50,
};
class Upgrades {
    constructor(decreasePrice, upgrades, getClicks) {
        this.multiplierPricePerClick = 1;
        this.multiplierPricePerSec = 1;
        // public start = (multiplierPrice: number) => {
        this.start = () => {
            const { multiplierPricePerClick, multiplierPricePerSec } = getDataFromLocalStorage(LocalStorage.multipliers);
            this.multiplierPricePerClick = +multiplierPricePerClick;
            this.multiplierPricePerSec = +multiplierPricePerSec;
            this.showPrices();
            getElementBySelector(`${selectors.perClick} button`).addEventListener('click', () => this.upgradeClickSize(1));
            getElementBySelector(`${selectors.perSec} button`).addEventListener('click', () => this.upgradeClicksPerSec(1));
            this.renderUpgrades();
        };
        this.showPrices = () => {
            getElementBySelector(`${selectors.perClick} .price`).textContent =
                String(Math.floor(defaultPrices.perClick * this.multiplierPricePerClick));
            getElementBySelector(`${selectors.perSec} .price`).textContent = String(Math.floor(defaultPrices.perSec * this.multiplierPricePerSec));
        };
        this.upgradeClickSize = (count = 1) => {
            const totalPrice = Math.floor(defaultPrices.perClick * this.multiplierPricePerClick);
            console.log(totalPrice);
            if (this.getClicks() >= totalPrice) {
                this.decreasePrice(defaultPrices.perClick * this.multiplierPricePerClick);
                this.upgrades.clickSize += count;
                this.multiplierPricePerClick *= PRICE_INCREASE;
                this.showPrices();
                this.renderUpgrades();
                setDataToLocalStorage(LocalStorage.upgrades, this.upgrades);
                setDataToLocalStorage(LocalStorage.multipliers, {
                    multiplierPricePerClick: Math.floor(this.multiplierPricePerClick),
                    multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
                });
            }
            else {
                alert('Недостаточно кликов для покупки');
            }
        };
        this.upgradeClicksPerSec = (count = 1) => {
            const totalPrice = Math.floor(defaultPrices.perSec * this.multiplierPricePerSec);
            if (this.getClicks() >= totalPrice) {
                this.decreasePrice(totalPrice);
                this.upgrades.clicksPerSecond += count;
                this.multiplierPricePerSec *= PRICE_INCREASE;
                this.showPrices();
                this.renderUpgrades();
                setDataToLocalStorage(LocalStorage.upgrades, this.upgrades);
                setDataToLocalStorage(LocalStorage.multipliers, {
                    multiplierPricePerClick: Math.floor(this.multiplierPricePerClick),
                    multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
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
        this.decreasePrice = decreasePrice;
        this.upgrades = upgrades;
        this.getClicks = getClicks;
    }
}
