"use strict";
class Clicker {
    constructor(counter, button, changeTheme) {
        this.counter = counter;
        this.button = button;
        this.changeTheme = changeTheme;
        this.clicks = 0;
        this.clickSize = 1;
        this.isDarkTheme = false;
        this.setCount = (count) => {
            if (!isNaN(count) && count >= 0) {
                this.clicks = count;
                this.counter.textContent = count.toString();
                setDataToLocalStorage('clicks', count.toString());
            }
        };
        this.addCount = (count) => {
            this.setCount(this.clicks + count);
        };
        this.startGame = () => {
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
        };
        this.returnSetting = () => {
            const prevCount = getDataFromLocalStorage(LocalStorage.clicks);
            this.isDarkTheme = getDataFromLocalStorage(LocalStorage.isDarkTheme);
            this.toggleTheme(this.isDarkTheme);
            this.setCount(+prevCount || 0);
        };
        this.toggleTheme = (isDarkTheme = false) => {
            isDarkTheme
                ? document.body.classList.add('dark')
                : document.body.classList.remove('dark');
        };
    }
}
