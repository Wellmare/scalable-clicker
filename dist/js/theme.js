"use strict";
var themes;
(function (themes) {
    themes["dark"] = "dark";
    themes["light"] = "light";
})(themes || (themes = {}));
class Theme {
    constructor(themingChangeElement) {
        this.themingChangeElement = themingChangeElement;
        this.currentTheme = themes.light;
        this.start = () => {
            this.getThemeFromLS();
            this.themingChangeElement.addEventListener('click', () => {
                this.setTheme(this.currentTheme === themes.light ? themes.dark : themes.light);
            });
        };
        this.getThemeFromLS = () => {
            const theme = getDataFromLocalStorage('theme') || themes.light;
            this.setTheme(theme);
        };
        this.setTheme = (theme) => {
            this.currentTheme = theme;
            setDataToLocalStorage('theme', theme);
            switch (theme) {
                case themes.dark:
                    document.body.classList.add('dark');
                    break;
                case themes.light:
                    document.body.classList.remove('dark');
                    break;
            }
        };
        this.start();
    }
}
