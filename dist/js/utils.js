"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementBySelector = exports.LocalStorage = exports.setDataToLocalStorage = exports.getDataFromLocalStorage = void 0;
const getDataFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};
exports.getDataFromLocalStorage = getDataFromLocalStorage;
const setDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
exports.setDataToLocalStorage = setDataToLocalStorage;
var LocalStorage;
(function (LocalStorage) {
    LocalStorage["CLICKS"] = "clicks";
    LocalStorage["THEME"] = "theme";
    LocalStorage["MULTIPLIER_PRICE"] = "multiplierPrice";
    LocalStorage["UPGRADES"] = "upgrades";
})(LocalStorage = exports.LocalStorage || (exports.LocalStorage = {}));
const getElementBySelector = (selector) => {
    return document.querySelector(selector);
};
exports.getElementBySelector = getElementBySelector;
