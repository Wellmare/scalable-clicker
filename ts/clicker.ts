class Clicker {
    private clicks: number = 0
    private clickSize: number = 1

    private isDarkTheme: boolean = false

    constructor(
        public counter: HTMLElement,
        public button: HTMLElement,
        public changeTheme: HTMLElement
    ) {}

    private setCount = (count: number): void => {
        if (!isNaN(count) && count >= 0) {
            this.clicks = count
            this.counter.textContent = count.toString()
            setDataToLocalStorage('clicks', count)
        }
    }

    private addCount = (count: number): void => {
        this.setCount(this.clicks + count)
    }

    public startGame = (): void => {
        this.returnSetting()

        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            this.addCount(this.clickSize)
        })
        this.changeTheme.addEventListener('click', () => {
            this.isDarkTheme = !this.isDarkTheme
            setDataToLocalStorage(LocalStorage.isDarkTheme, this.isDarkTheme)
            this.toggleTheme(this.isDarkTheme)
        })
    }

    private returnSetting = () => {
        const prevCount = getDataFromLocalStorage(LocalStorage.clicks)
        this.isDarkTheme = getDataFromLocalStorage(LocalStorage.isDarkTheme)

        this.toggleTheme(this.isDarkTheme)
        this.setCount(+prevCount || 0)
    }

    private toggleTheme = (isDarkTheme: boolean = false): void => {
        isDarkTheme
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }
}
