"use strict";
// interface IUpgrades {
//     clicksPerSecond: number
//     clickSize: number
// }
class Clicker {
    constructor(counter, button, changeTheme, upgradeBlocksSelectors) {
        this.counter = counter;
        this.button = button;
        this.changeTheme = changeTheme;
        this.upgradeBlocksSelectors = upgradeBlocksSelectors;
        this.clicks = 0;
        // private clickSize: number = 1
        this.upgrades = {
            clickSize: 1,
            clicksPerSecond: 0,
        };
        this.isDarkTheme = false;
        this.setCount = (count) => {
            if (!isNaN(count) && count >= 0) {
                this.clicks = Math.floor(count);
                this.counter.textContent = String(Math.floor(count));
                setDataToLocalStorage('clicks', Math.floor(count));
            }
        };
        this.addCount = (count = this.upgrades.clickSize) => {
            this.setCount(this.clicks + count);
        };
        this.startGame = () => {
            this.returnSetting();
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.addCount();
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
        };
        this.returnSetting = () => {
            const prevCount = getDataFromLocalStorage(LocalStorage.clicks);
            this.isDarkTheme = getDataFromLocalStorage(LocalStorage.isDarkTheme);
            this.upgrades = getDataFromLocalStorage('upgrades') || this.upgrades;
            this.toggleTheme(this.isDarkTheme);
            this.setCount(+prevCount || 0);
            setInterval(() => {
                this.addCount(this.upgrades.clicksPerSecond);
            }, 1000);
            new Upgrades(this.decreasePrice, this.upgrades, this.getClicks).start();
        };
        this.toggleTheme = (isDarkTheme = false) => {
            isDarkTheme
                ? document.body.classList.add('dark')
                : document.body.classList.remove('dark');
        };
        this.decreasePrice = (count) => {
            this.setCount(this.clicks - Math.floor(count));
        };
        this.getClicks = () => this.clicks;
    }
}
