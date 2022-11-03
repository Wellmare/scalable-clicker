class Clicker {
    #clicks = 0
    #clickSize = 1

    counter
    button
    changeTheme

    isDarktheme = false

    constructor(counterEl, buttonEl, changeThemeEl) {
        this.counter = counterEl
        this.button = buttonEl
        this.changeTheme = changeThemeEl
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
    startGame = async () => {
        const prevCount = await +Clicker.getDataFromLocalStorage('clicks')
        this.isDarktheme = await Clicker.getDataFromLocalStorage('darkTheme')

        this.toggleTheme(this.isDarktheme)

        this.setCount(prevCount)
        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            this.addCount(this.#clickSize)
        })

        this.changeTheme.addEventListener('click', () => {
            this.setDarkTheme(!Clicker.getDataFromLocalStorage('darkTheme'))
        })
    }

    static getDataFromLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    static setDataToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    toggleTheme = (bool) => {
        bool
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }

    setDarkTheme = (bool) => {
        if (bool) {
            Clicker.setDataToLocalStorage('darkTheme', true)
        } else {
            Clicker.setDataToLocalStorage('darkTheme', false)
        }
        this.toggleTheme(bool)
    }
}
