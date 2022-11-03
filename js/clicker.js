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
            setDataToLocalStorage('clicks', count)
        }
    }
    addCount = (count) => {
        this.setCount(this.#clicks + count)
    }
    startGame = async () => {
        const prevCount = await +getDataFromLocalStorage('clicks')
        this.isDarktheme = await getDataFromLocalStorage('darkTheme')

        this.toggleTheme(this.isDarktheme)

        this.setCount(prevCount)
        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            this.addCount(this.#clickSize)
        })

        this.changeTheme.addEventListener('click', () => {
            this.isDarktheme = !this.isDarktheme
            setDataToLocalStorage('darkTheme', this.isDarktheme)
            this.toggleTheme(this.isDarktheme)
        })
    }

    toggleTheme = (bool) => {
        bool
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }
}
