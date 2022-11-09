import { Theme } from './theme'
import { IUpgrades, LocalStorage } from './types'
import { Upgrades } from './upgrades'
import {
    getDataFromLocalStorage,
    getElementBySelector,
    setDataToLocalStorage,
} from './utils'

class Clicker {
    private clicks: number = 0
    private upgrades: IUpgrades = {
        clickSize: 1,
        clicksPerSecond: 0,
    }

    constructor(
        public counter: HTMLSpanElement,
        public button: HTMLButtonElement
    ) {}

    public startGame = (): void => {
        this.returnSetting()

        this.button.addEventListener('click', (e) => {
            e.preventDefault()
            this.addCount()
        })

        new Theme(getElementBySelector<HTMLImageElement>('#theme'))
        new Upgrades(this.decreasePrice, this.getClicks, this.upgrades).start()
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
        const prevCount = getDataFromLocalStorage<number>(LocalStorage.CLICKS)
        this.setCount(+prevCount || 0)

        this.upgrades =
            getDataFromLocalStorage<IUpgrades>('upgrades') || this.upgrades
        setInterval(() => {
            this.addCount(this.upgrades.clicksPerSecond)
        }, 1000)
    }

    private decreasePrice = (count: number) => {
        this.setCount(this.clicks - Math.floor(count))
    }
}

export { Clicker }