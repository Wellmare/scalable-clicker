"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clicker = void 0;
const theme_1 = require("./theme");
const upgrades_1 = require("./upgrades");
const utils_1 = require("./utils");
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
            new theme_1.Theme((0, utils_1.getElementBySelector)('#theme'));
            new upgrades_1.Upgrades(this.decreasePrice, this.getClicks, this.upgrades).start();
        };
        this.setCount = (count) => {
            const flooredCount = Math.floor(count);
            if (!isNaN(count) && count >= 0) {
                this.clicks = flooredCount;
                this.counter.textContent = String(flooredCount);
                (0, utils_1.setDataToLocalStorage)('clicks', flooredCount);
            }
        };
        this.addCount = (count = this.upgrades.clickSize) => {
            this.setCount(this.clicks + count);
        };
        this.getClicks = () => this.clicks;
        this.returnSetting = () => {
            const prevCount = (0, utils_1.getDataFromLocalStorage)(utils_1.LocalStorage.CLICKS);
            this.setCount(+prevCount || 0);
            this.upgrades =
                (0, utils_1.getDataFromLocalStorage)('upgrades') || this.upgrades;
            setInterval(() => {
                this.addCount(this.upgrades.clicksPerSecond);
            }, 1000);
        };
        this.decreasePrice = (count) => {
            this.setCount(this.clicks - Math.floor(count));
        };
    }
}
exports.Clicker = Clicker;
