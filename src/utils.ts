export const getDataFromLocalStorage = <T>(key: string): T => {
    return JSON.parse(localStorage.getItem(key) as string) as T
}

export const setDataToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getElementBySelector = <T extends HTMLElement>(
    selector: string
): T => {
    return document.querySelector(selector) as T
}
