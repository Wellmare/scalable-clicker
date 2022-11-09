/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/clicker.ts":
/*!************************!*\
  !*** ./src/clicker.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Clicker = void 0;\r\nconst theme_1 = __webpack_require__(/*! ./theme */ \"./src/theme.ts\");\r\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/types.ts\");\r\nconst upgrades_1 = __webpack_require__(/*! ./upgrades */ \"./src/upgrades.ts\");\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nclass Clicker {\r\n    constructor(counter, button) {\r\n        this.counter = counter;\r\n        this.button = button;\r\n        this.clicks = 0;\r\n        this.upgrades = {\r\n            clickSize: 1,\r\n            clicksPerSecond: 0,\r\n        };\r\n        this.startGame = () => {\r\n            this.returnSetting();\r\n            this.button.addEventListener('click', (e) => {\r\n                e.preventDefault();\r\n                this.addCount();\r\n            });\r\n            new theme_1.Theme((0, utils_1.getElementBySelector)('#theme'));\r\n            new upgrades_1.Upgrades(this.decreasePrice, this.getClicks, this.upgrades).start();\r\n        };\r\n        this.setCount = (count) => {\r\n            const flooredCount = Math.floor(count);\r\n            if (!isNaN(count) && count >= 0) {\r\n                this.clicks = flooredCount;\r\n                this.counter.textContent = String(flooredCount);\r\n                (0, utils_1.setDataToLocalStorage)('clicks', flooredCount);\r\n            }\r\n        };\r\n        this.addCount = (count = this.upgrades.clickSize) => {\r\n            this.setCount(this.clicks + count);\r\n        };\r\n        this.getClicks = () => this.clicks;\r\n        this.returnSetting = () => {\r\n            const prevCount = (0, utils_1.getDataFromLocalStorage)(types_1.LocalStorage.CLICKS);\r\n            this.setCount(+prevCount || 0);\r\n            this.upgrades =\r\n                (0, utils_1.getDataFromLocalStorage)('upgrades') || this.upgrades;\r\n            setInterval(() => {\r\n                this.addCount(this.upgrades.clicksPerSecond);\r\n            }, 1000);\r\n        };\r\n        this.decreasePrice = (count) => {\r\n            this.setCount(this.clicks - Math.floor(count));\r\n        };\r\n    }\r\n}\r\nexports.Clicker = Clicker;\r\n\n\n//# sourceURL=webpack://scalable-clicker/./src/clicker.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst clicker_1 = __webpack_require__(/*! ./clicker */ \"./src/clicker.ts\");\r\nconst counter = document.querySelector('#counter');\r\nconst button = document.querySelector('#button');\r\n// const changeTheme = document.querySelector('#theme')\r\nconst clicker = new clicker_1.Clicker(counter, button);\r\nclicker.startGame();\r\n\n\n//# sourceURL=webpack://scalable-clicker/./src/index.ts?");

/***/ }),

/***/ "./src/theme.ts":
/*!**********************!*\
  !*** ./src/theme.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Theme = void 0;\r\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/types.ts\");\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nclass Theme {\r\n    constructor(themingChangeElement) {\r\n        this.themingChangeElement = themingChangeElement;\r\n        this.currentTheme = types_1.themes.LIGHT;\r\n        this.start = () => {\r\n            this.setThemeFromLS();\r\n            this.themingChangeElement.addEventListener('click', () => {\r\n                this.setTheme(this.currentTheme === types_1.themes.LIGHT ? types_1.themes.DARK : types_1.themes.LIGHT);\r\n            });\r\n        };\r\n        this.setThemeFromLS = () => {\r\n            const theme = (0, utils_1.getDataFromLocalStorage)('theme') || types_1.themes.LIGHT;\r\n            this.setTheme(theme);\r\n        };\r\n        this.setTheme = (theme) => {\r\n            this.currentTheme = theme;\r\n            (0, utils_1.setDataToLocalStorage)('theme', theme);\r\n            switch (theme) {\r\n                case types_1.themes.DARK:\r\n                    document.body.classList.add('dark');\r\n                    break;\r\n                case types_1.themes.LIGHT:\r\n                    document.body.classList.remove('dark');\r\n                    break;\r\n            }\r\n        };\r\n        this.start();\r\n    }\r\n}\r\nexports.Theme = Theme;\r\n\n\n//# sourceURL=webpack://scalable-clicker/./src/theme.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\n// Upgrades\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.LocalStorage = exports.themes = exports.TypesUpgrades = exports.Selectors = void 0;\r\nvar Selectors;\r\n(function (Selectors) {\r\n    Selectors[\"PER_SEC\"] = \"#per-sec\";\r\n    Selectors[\"PER_CLICK\"] = \"#per-click\";\r\n})(Selectors = exports.Selectors || (exports.Selectors = {}));\r\nvar TypesUpgrades;\r\n(function (TypesUpgrades) {\r\n    TypesUpgrades[\"PER_CLICK\"] = \"perClick\";\r\n    TypesUpgrades[\"PER_SEC\"] = \"perSec\";\r\n})(TypesUpgrades = exports.TypesUpgrades || (exports.TypesUpgrades = {}));\r\n// Theme\r\nvar themes;\r\n(function (themes) {\r\n    themes[\"DARK\"] = \"dark\";\r\n    themes[\"LIGHT\"] = \"light\";\r\n})(themes = exports.themes || (exports.themes = {}));\r\n// LocalStorage\r\nvar LocalStorage;\r\n(function (LocalStorage) {\r\n    LocalStorage[\"CLICKS\"] = \"clicks\";\r\n    LocalStorage[\"THEME\"] = \"theme\";\r\n    LocalStorage[\"MULTIPLIER_PRICE\"] = \"multiplierPrice\";\r\n    LocalStorage[\"UPGRADES\"] = \"upgrades\";\r\n})(LocalStorage = exports.LocalStorage || (exports.LocalStorage = {}));\r\n\n\n//# sourceURL=webpack://scalable-clicker/./src/types.ts?");

/***/ }),

/***/ "./src/upgrades.ts":
/*!*************************!*\
  !*** ./src/upgrades.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Upgrades = void 0;\r\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/types.ts\");\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nconst PRICE_INCREASE = 1.75;\r\nconst defaultPrices = {\r\n    perClick: 10,\r\n    perSec: 50,\r\n};\r\nclass Upgrades {\r\n    constructor(decreasePrice, getClicks, upgrades) {\r\n        this.decreasePrice = decreasePrice;\r\n        this.getClicks = getClicks;\r\n        this.multiplierPrice = {\r\n            perClick: 1,\r\n            perSec: 1,\r\n        };\r\n        this.start = () => {\r\n            this.setMultiplierPriceFromLS();\r\n            this.showPrices();\r\n            const listenEventButton = (selector, funcOnClick) => {\r\n                (0, utils_1.getElementBySelector)(`${selector} button`).addEventListener('click', funcOnClick);\r\n            };\r\n            listenEventButton(types_1.Selectors.PER_CLICK, () => this.upgrade(types_1.TypesUpgrades.PER_CLICK, 1));\r\n            listenEventButton(types_1.Selectors.PER_SEC, () => this.upgrade(types_1.TypesUpgrades.PER_SEC, 1));\r\n            this.renderUpgrades();\r\n        };\r\n        this.showPrices = () => {\r\n            const showPrice = (selector, price) => {\r\n                (0, utils_1.getElementBySelector)(`${selector} .price`).textContent = String(Math.floor(price));\r\n            };\r\n            showPrice(types_1.Selectors.PER_CLICK, defaultPrices.perClick * this.multiplierPrice.perClick);\r\n            showPrice(types_1.Selectors.PER_SEC, defaultPrices.perSec * this.multiplierPrice.perSec);\r\n        };\r\n        // private upgradeClickSize = (count: number = 1) => {\r\n        //     const totalPrice: number = Math.floor(\r\n        //         defaultPrices.perClick * this.multiplierPricePerClick\r\n        //     )\r\n        //     console.log(totalPrice)\r\n        //     if (this.getClicks() >= totalPrice) {\r\n        //         this.decreasePrice(\r\n        //             defaultPrices.perClick * this.multiplierPricePerClick\r\n        //         )\r\n        //         this.upgrades.clickSize += count\r\n        //         this.multiplierPricePerClick *= PRICE_INCREASE\r\n        //         this.showPrices()\r\n        //         this.renderUpgrades()\r\n        //         setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)\r\n        //         setDataToLocalStorage(LocalStorage.multipliers, {\r\n        //             multiplierPricePerClick: Math.floor(\r\n        //                 this.multiplierPricePerClick\r\n        //             ),\r\n        //             multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),\r\n        //         })\r\n        //     } else {\r\n        //         alert('Недостаточно кликов для покупки')\r\n        //     }\r\n        // }\r\n        // private upgradeClicksPerSec = (count: number = 1) => {\r\n        //     const totalPrice: number = Math.floor(\r\n        //         defaultPrices.perSec * this.multiplierPricePerSec\r\n        //     )\r\n        //     if (this.getClicks() >= totalPrice) {\r\n        //         this.decreasePrice(totalPrice)\r\n        //         this.upgrades.clicksPerSecond += count\r\n        //         this.multiplierPricePerSec *= PRICE_INCREASE\r\n        //         this.showPrices()\r\n        //         this.renderUpgrades()\r\n        //         setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)\r\n        //         setDataToLocalStorage(LocalStorage.multipliers, {\r\n        //             multiplierPricePerClick: Math.floor(\r\n        //                 this.multiplierPricePerClick\r\n        //             ),\r\n        //             multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),\r\n        //         })\r\n        //     } else {\r\n        //         alert('Недостаточно кликов для покупки')\r\n        //     }\r\n        // }\r\n        this.upgrade = (type, count) => {\r\n            const totalPrice = Math.floor(type === types_1.TypesUpgrades.PER_CLICK\r\n                ? defaultPrices.perClick * this.multiplierPrice.perClick\r\n                : defaultPrices.perSec * this.multiplierPrice.perSec);\r\n            if (this.getClicks() >= totalPrice) {\r\n                this.decreasePrice(totalPrice);\r\n                if (type === types_1.TypesUpgrades.PER_CLICK) {\r\n                    this.upgrades.clickSize += count;\r\n                    this.multiplierPrice.perClick *= PRICE_INCREASE;\r\n                }\r\n                else {\r\n                    this.upgrades.clicksPerSecond += count;\r\n                    this.multiplierPrice.perSec *= PRICE_INCREASE;\r\n                }\r\n                this.showPrices();\r\n                this.renderUpgrades();\r\n                (0, utils_1.setDataToLocalStorage)(types_1.LocalStorage.UPGRADES, this.upgrades);\r\n                (0, utils_1.setDataToLocalStorage)(types_1.LocalStorage.MULTIPLIER_PRICE, {\r\n                    multiplierPricePerClick: Math.floor(this.multiplierPrice.perClick),\r\n                    multiplierPricePerSec: Math.floor(this.multiplierPrice.perSec),\r\n                });\r\n            }\r\n            else {\r\n                alert('Недостаточно кликов для покупки');\r\n            }\r\n        };\r\n        this.renderUpgrades = () => {\r\n            (0, utils_1.getElementBySelector)('#counterPerClick').textContent =\r\n                String(this.upgrades.clickSize);\r\n            (0, utils_1.getElementBySelector)('#counterPerSec').textContent =\r\n                String(this.upgrades.clicksPerSecond);\r\n        };\r\n        this.setMultiplierPriceFromLS = () => {\r\n            const dataFromLS = (0, utils_1.getDataFromLocalStorage)(types_1.LocalStorage.MULTIPLIER_PRICE);\r\n            if (dataFromLS) {\r\n                this.multiplierPrice.perClick = dataFromLS.multiplierPricePerClick;\r\n                this.multiplierPrice.perSec = dataFromLS.multiplierPricePerSec;\r\n            }\r\n            // const { multPricePerClick, multPricePerSec } =\r\n        };\r\n        this.upgrades = upgrades;\r\n    }\r\n}\r\nexports.Upgrades = Upgrades;\r\n\n\n//# sourceURL=webpack://scalable-clicker/./src/upgrades.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getElementBySelector = exports.setDataToLocalStorage = exports.getDataFromLocalStorage = void 0;\r\nconst getDataFromLocalStorage = (key) => {\r\n    return JSON.parse(localStorage.getItem(key));\r\n};\r\nexports.getDataFromLocalStorage = getDataFromLocalStorage;\r\nconst setDataToLocalStorage = (key, value) => {\r\n    localStorage.setItem(key, JSON.stringify(value));\r\n};\r\nexports.setDataToLocalStorage = setDataToLocalStorage;\r\nconst getElementBySelector = (selector) => {\r\n    return document.querySelector(selector);\r\n};\r\nexports.getElementBySelector = getElementBySelector;\r\n\n\n//# sourceURL=webpack://scalable-clicker/./src/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;