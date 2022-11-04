"use strict";
const getDataFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};
const setDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
var LocalStorage;
(function (LocalStorage) {
    LocalStorage["clicks"] = "clicks";
    LocalStorage["isDarkTheme"] = "isDarkTheme";
})(LocalStorage || (LocalStorage = {}));
