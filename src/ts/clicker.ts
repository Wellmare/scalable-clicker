interface IUpgrades {
    clicksPerSecond: number
    clickSize: number

    multiplier: number
}

class Clicker {
    private clicks: number = 0
    private clickSize: number = 1

    private upgrades: IUpgrades = {
        clickSize: 1,
        clicksPerSecond: 0,
        multiplier: 1,
    }

    private defaultPrices = {
        perClick: 10,
        perSec: 50,
    }
    private multuplierPrice = 1.5

    private isDarkTheme: boolean = false

    constructor(
        public counter: HTMLElement,
        public button: HTMLElement,
        public changeTheme: HTMLElement,
        public upgradeBlocksSelectors: { perClick: string; perSec: string }
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

        // enum typesUpgrades {
        //     perClick,
        //     perSec
        // }

        // const onUpgrade = (typeUpgrade: typesUpgrades) => {
        //     if (typeUpgrade === typesUpgrades.perClick) {

        //     }
        // }

        document
            .querySelector(`${this.upgradeBlocksSelectors.perClick} button`)
            ?.addEventListener('click', this.upgradePerClick)
        document
            .querySelector(`${this.upgradeBlocksSelectors.perSec} button`)
            ?.addEventListener('click', this.upgradePerSec)
    }

    private returnSetting = () => {
        const prevCount = getDataFromLocalStorage(LocalStorage.clicks)
        this.isDarkTheme = getDataFromLocalStorage(LocalStorage.isDarkTheme)

        this.toggleTheme(this.isDarkTheme)
        this.setCount(+prevCount || 0)

        const perClickBlock = document.getElementById(
            this.upgradeBlocksSelectors.perClick
        ) as HTMLElement
        const perSecBlock = document.getElementById(
            this.upgradeBlocksSelectors.perSec
        ) as HTMLElement

        ;(perClickBlock.querySelector('.price') as HTMLElement).textContent = (
            this.defaultPrices.perClick * this.upgrades.multiplier
        ).toString()
        ;(perSecBlock.querySelector('.price') as HTMLElement).textContent = (
            this.defaultPrices.perSec * this.upgrades.multiplier
        ).toString()
    }

    private toggleTheme = (isDarkTheme: boolean = false): void => {
        isDarkTheme
            ? document.body.classList.add('dark')
            : document.body.classList.remove('dark')
    }

    private upgradePerClick = (): void => {
        this.upgrades.clickSize++
        this.upgrades.multiplier *= this.multuplierPrice
    }
    private upgradePerSec = (): void => {
        this.upgrades.clicksPerSecond++
        this.upgrades.multiplier *= this.multuplierPrice
    }
}
