"use strict";
class Clicker {
    constructor(counter, button, changeTheme, upgradeBlocksSelectors) {
        this.counter = counter;
        this.button = button;
        this.changeTheme = changeTheme;
        this.upgradeBlocksSelectors = upgradeBlocksSelectors;
        this.clicks = 0;
        this.clickSize = 1;
        this.upgrades = {
            clickSize: 1,
            clicksPerSecond: 0,
            multiplier: 1,
        };
        this.defaultPrices = {
            perClick: 10,
            perSec: 50,
        };
        this.multuplierPrice = 1.5;
        this.isDarkTheme = false;
        this.setCount = (count) => {
            if (!isNaN(count) && count >= 0) {
                this.clicks = count;
                this.counter.textContent = count.toString();
                setDataToLocalStorage('clicks', count);
            }
        };
        this.addCount = (count) => {
            this.setCount(this.clicks + count);
        };
        this.startGame = () => {
            var _a, _b;
            this.returnSetting();
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.addCount(this.clickSize);
            });
            this.changeTheme.addEventListener('click', () => {
                this.isDarkTheme = !this.isDarkTheme;
                setDataToLocalStorage(LocalStorage.isDarkTheme, this.isDarkTheme);
                this.toggleTheme(this.isDarkTheme);
            });
            // enum typesUpgrades {
            //     perClick,
            //     perSec
            // }
            // const onUpgrade = (typeUpgrade: typesUpgrades) => {
            //     if (typeUpgrade === typesUpgrades.perClick) {
            //     }
            // } 
            (_a = document.querySelector(`${this.upgradeBlocksSelectors.perClick} button`)) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.upgradePerClick);
            (_b = document.querySelector(`${this.upgradeBlocksSelectors.perSec} button`)) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.upgradePerSec);
        };
        this.returnSetting = () => {
            const prevCount = getDataFromLocalStorage(LocalStorage.clicks);
            this.isDarkTheme = getDataFromLocalStorage(LocalStorage.isDarkTheme);
            this.toggleTheme(this.isDarkTheme);
            this.setCount(+prevCount || 0);
            const perClickBlock = document.getElementById(this.upgradeBlocksSelectors.perClick);
            const perSecBlock = document.getElementById(this.upgradeBlocksSelectors.perSec);
            perClickBlock.querySelector('.price').textContent = (this.defaultPrices.perClick * this.upgrades.multiplier).toString();
            perSecBlock.querySelector('.price').textContent = (this.defaultPrices.perSec * this.upgrades.multiplier).toString();
        };
        this.toggleTheme = (isDarkTheme = false) => {
            isDarkTheme
                ? document.body.classList.add('dark')
                : document.body.classList.remove('dark');
        };
        this.upgradePerClick = () => {
            this.upgrades.clickSize++;
            this.upgrades.multiplier *= this.multuplierPrice;
        };
        this.upgradePerSec = () => {
            this.upgrades.clicksPerSecond++;
            this.upgrades.multiplier *= this.multuplierPrice;
        };
    }
}
