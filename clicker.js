class Clicker {
    #clicks = 0
    #clickSize = 1

    counter
    button

    constructor(counterEl, buttonEl) {
        this.counter = counterEl
        this.button = buttonEl
    }

    setCount = (count) => {
        if (!isNaN(count) && count >= 0) {
            this.#clicks = count
            this.counter.textContent = count
            Clicker.setDataToLocalStorage('clicks', count)
        }
    }
    addCount = (count) => {
        this.setCount(this.#clicks + count)
    }
    startGame = (prevCount = 0) => {
        this.setCount(prevCount)
        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            this.addCount(this.#clickSize)
        })
    }

    static getDataFromLocalStorage = (key) => {
        return +localStorage.getItem(key)
    }

    static setDataToLocalStorage = (key, value) => {
        localStorage.setItem(key, value)
    }
}
