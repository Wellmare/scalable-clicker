const getDataFromLocalStorage = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) as string)
}

const setDataToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
}

enum LocalStorage {
    clicks = 'clicks',
    isDarkTheme = 'isDarkTheme',
    multipliers = 'multipliers',
    upgrades = 'upgrades',
}

const getElementBySelector = (selector: string) => {
    return document.querySelector(selector) as HTMLElement
}
