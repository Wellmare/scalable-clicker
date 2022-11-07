"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const types_1 = require("./types");
const utils_1 = require("./utils");
class Theme {
    constructor(themingChangeElement) {
        this.themingChangeElement = themingChangeElement;
        this.currentTheme = types_1.themes.LIGHT;
        this.start = () => {
            this.setThemeFromLS();
            this.themingChangeElement.addEventListener('click', () => {
                this.setTheme(this.currentTheme === types_1.themes.LIGHT ? types_1.themes.DARK : types_1.themes.LIGHT);
            });
        };
        this.setThemeFromLS = () => {
            const theme = (0, utils_1.getDataFromLocalStorage)('theme') || types_1.themes.LIGHT;
            this.setTheme(theme);
        };
        this.setTheme = (theme) => {
            this.currentTheme = theme;
            (0, utils_1.setDataToLocalStorage)('theme', theme);
            switch (theme) {
                case types_1.themes.DARK:
                    document.body.classList.add('dark');
                    break;
                case types_1.themes.LIGHT:
                    document.body.classList.remove('dark');
                    break;
            }
        };
        this.start();
    }
}
exports.Theme = Theme;
