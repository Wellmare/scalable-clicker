const getDataFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const setDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}