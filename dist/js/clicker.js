"use strict";
class Clicker {
    constructor(counter, button) {
        this.counter = counter;
        this.button = button;
        this.clicks = 0;
        this.upgrades = {
            clickSize: 1,
            clicksPerSecond: 0,
        };
        this.startGame = () => {
            this.returnSetting();
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.addCount();
            });
            new Theme(getElementBySelector('#theme'));
            new Upgrades(this.decreasePrice, this.getClicks, this.upgrades).start();
            // enum typesUpgrades {
            //     perClick,
            //     perSec
            // }
            // const onUpgrade = (typeUpgrade: typesUpgrades) => {
            //     if (typeUpgrade === typesUpgrades.perClick) {
            //     }
            // }
        };
        this.setCount = (count) => {
            const flooredCount = Math.floor(count);
            if (!isNaN(count) && count >= 0) {
                this.clicks = flooredCount;
                this.counter.textContent = String(flooredCount);
                setDataToLocalStorage('clicks', flooredCount);
            }
        };
        this.addCount = (count = this.upgrades.clickSize) => {
            this.setCount(this.clicks + count);
        };
        this.getClicks = () => this.clicks;
        this.returnSetting = () => {
            const prevCount = getDataFromLocalStorage(LocalStorage.clicks);
            this.setCount(+prevCount || 0);
            this.upgrades = getDataFromLocalStorage('upgrades') || this.upgrades;
            setInterval(() => {
                this.addCount(this.upgrades.clicksPerSecond);
            }, 1000);
        };
        this.decreasePrice = (count) => {
            this.setCount(this.clicks - Math.floor(count));
        };
    }
}
