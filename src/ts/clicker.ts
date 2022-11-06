// interface IUpgrades {
//     clicksPerSecond: number
//     clickSize: number
// }

class Clicker {
    private clicks: number = 0
    // private clickSize: number = 1

    private upgrades: IUpgrades = {
        clickSize: 1,
        clicksPerSecond: 0,
    }

    private isDarkTheme: boolean = false

    constructor(
        public counter: HTMLElement,
        public button: HTMLElement,
        public changeTheme: HTMLElement,
        public upgradeBlocksSelectors: { perClick: string; perSec: string }
    ) {}

    private setCount = (count: number): void => {
        if (!isNaN(count) && count >= 0) {
            this.clicks = Math.floor(count)
            this.counter.textContent = String(Math.floor(count))
            setDataToLocalStorage('clicks', Math.floor(count))
        }
    }

    private addCount = (count: number = this.upgrades.clickSize): void => {
        this.setCount(this.clicks + count)
    }

    public startGame = (): void => {
        this.returnSetting()

        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            this.addCount()
        })
        this.changeTheme.addEventListener('click', () => {
            this.isDarkTheme = !this.isDarkTheme
            setDataToLocalStorage(LocalStorage.isDarkTheme, this.isDarkTheme)
            this.toggleTheme(this.isDarkTheme)
        })

        // enum typesUpgrades {
        //     perClick,
        //     perSec
        // }

        // const onUpgrade = (typeUpgrade: typesUpgrades) => {
        //     if (typeUpgrade === typesUpgrades.perClick) {

        //     }
        // }
    }

    private returnSetting = () => {
        const prevCount = getDataFromLocalStorage(LocalStorage.clicks)
        this.isDarkTheme = getDataFromLocalStorage(LocalStorage.isDarkTheme)

        this.upgrades = getDataFromLocalStorage('upgrades') || this.upgrades

        this.toggleTheme(this.isDarkTheme)
        this.setCount(+prevCount || 0)

        setInterval(() => {
            this.addCount(this.upgrades.clicksPerSecond)
        }, 1000)

        new Upgrades(this.decreasePrice, this.upgrades, this.getClicks).start()
    }

    private toggleTheme = (isDarkTheme: boolean = false): void => {
        isDarkTheme
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }

    private decreasePrice = (count: number) => {
        this.setCount(this.clicks - Math.floor(count))
    }

    private getClicks = (): number => this.clicks
}
