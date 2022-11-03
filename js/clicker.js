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

    setCount = async (count) => {
        if (!isNaN(count) && count >= 0) {
            this.#clicks = count
            this.counter.textContent = count
            await setDataToLocalStorage('clicks', count)
        }
    }
    addCount = async (count) => {
        await this.setCount(this.#clicks + count)
    }
    startGame = async () => {
        const prevCount = await getDataFromLocalStorage('clicks')
        this.isDarktheme = await getDataFromLocalStorage('darkTheme')

        this.toggleTheme(this.isDarktheme)

        await this.setCount(+prevCount)
        this.button.addEventListener('click', async (e) => {
            e.preventDefault()
            await this.addCount(this.#clickSize)
        })

        this.changeTheme.addEventListener('click', async () => {
            this.isDarktheme = !this.isDarktheme
            await setDataToLocalStorage('darkTheme', this.isDarktheme)
            this.toggleTheme(this.isDarktheme)
        })
    }

    toggleTheme = (bool) => {
        bool
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }
}
