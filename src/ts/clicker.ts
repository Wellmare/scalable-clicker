class Clicker {
    private clicks: number = 0
    private upgrades: IUpgrades = {
        clickSize: 1,
        clicksPerSecond: 0,
    }

    constructor(public counter: HTMLSpanElement, public button: HTMLButtonElement) {}

    public startGame = (): void => {
        this.returnSetting()

        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            this.addCount()
        })

        new Theme(getElementBySelector<HTMLImageElement>('#theme'))
        new Upgrades(this.decreasePrice, this.getClicks, this.upgrades).start()

        // enum typesUpgrades {
        //     perClick,
        //     perSec
        // }

        // const onUpgrade = (typeUpgrade: typesUpgrades) => {
        //     if (typeUpgrade === typesUpgrades.perClick) {

        //     }
        // }
    }

    private setCount = (count: number): void => {
        const flooredCount = Math.floor(count)

        if (!isNaN(count) && count >= 0) {
            this.clicks = flooredCount
            this.counter.textContent = String(flooredCount)
            setDataToLocalStorage('clicks', flooredCount)
        }
    }

    private addCount = (count: number = this.upgrades.clickSize): void => {
        this.setCount(this.clicks + count)
    }

    private getClicks = (): number => this.clicks

    private returnSetting = () => {
        const prevCount = getDataFromLocalStorage(LocalStorage.clicks)
        this.setCount(+prevCount || 0)

        this.upgrades = getDataFromLocalStorage('upgrades') || this.upgrades
        setInterval(() => {
            this.addCount(this.upgrades.clicksPerSecond)
        }, 1000)
    }

    private decreasePrice = (count: number) => {
        this.setCount(this.clicks - Math.floor(count))
    }
}
