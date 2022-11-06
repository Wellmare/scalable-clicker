const getDataFromLocalStorage = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) as string)
}

const setDataToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
}

enum LocalStorage {
    clicks = 'clicks',
    theme = 'theme',
    multiplierPrice = 'multiplierPrice',
    upgrades = 'upgrades',
}

const getElementBySelector = <T extends HTMLElement>(selector: string) => {
    return document.querySelector(selector) as T
}
