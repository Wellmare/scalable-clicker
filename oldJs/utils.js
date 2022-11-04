const getDataFromLocalStorage = async (key) => {
    return await JSON.parse(localStorage.getItem(key))
}

const setDataToLocalStorage = async (key, value) => {
    await localStorage.setItem(key, JSON.stringify(value))
}