interface IUpgrades {
    clicksPerSecond: number
    clickSize: number
}

enum selectors {
    perSec = '#per-sec',
    perClick = '#per-click',
}

const PRICE_INCREASE = 1.75

const defaultPrices = {
    perClick: 10,
    perSec: 50,
}

class Upgrades {
    private upgrades: IUpgrades

    private multiplierPricePerClick: number = 1
    private multiplierPricePerSec: number = 1

    private decreasePrice

    private getClicks: () => number

    constructor(
        decreasePrice: (count: number) => void,
        upgrades: IUpgrades,
        getClicks: () => number
    ) {
        this.decreasePrice = decreasePrice
        this.upgrades = upgrades
        this.getClicks = getClicks
    }

    // public start = (multiplierPrice: number) => {
    public start = () => {
        const { multiplierPricePerClick, multiplierPricePerSec } =
            getDataFromLocalStorage(LocalStorage.multipliers)
        this.multiplierPricePerClick = +multiplierPricePerClick
        this.multiplierPricePerSec = +multiplierPricePerSec

        this.showPrices()

        getElementBySelector(`${selectors.perClick} button`).addEventListener(
            'click',
            () => this.upgradeClickSize(1)
        )

        getElementBySelector(`${selectors.perSec} button`).addEventListener(
            'click',
            () => this.upgradeClicksPerSec(1)
        )

        this.renderUpgrades()
    }

    private showPrices = () => {
        getElementBySelector(`${selectors.perClick} .price`).textContent =
            String(
                Math.floor(
                    defaultPrices.perClick * this.multiplierPricePerClick
                )
            )
        getElementBySelector(`${selectors.perSec} .price`).textContent = String(
            Math.floor(defaultPrices.perSec * this.multiplierPricePerSec)
        )
    }

    private upgradeClickSize = (count: number = 1) => {
        const totalPrice: number = Math.floor(
            defaultPrices.perClick * this.multiplierPricePerClick
        )
        console.log(totalPrice)

        if (this.getClicks() >= totalPrice) {
            this.decreasePrice(
                defaultPrices.perClick * this.multiplierPricePerClick
            )
            this.upgrades.clickSize += count
            this.multiplierPricePerClick *= PRICE_INCREASE

            this.showPrices()
            this.renderUpgrades()
            setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)
            setDataToLocalStorage(LocalStorage.multipliers, {
                multiplierPricePerClick: Math.floor(
                    this.multiplierPricePerClick
                ),
                multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
            })
        } else {
            alert('Недостаточно кликов для покупки')
        }
    }

    private upgradeClicksPerSec = (count: number = 1) => {
        const totalPrice: number = Math.floor(
            defaultPrices.perSec * this.multiplierPricePerSec
        )

        if (this.getClicks() >= totalPrice) {
            this.decreasePrice(totalPrice)

            this.upgrades.clicksPerSecond += count
            this.multiplierPricePerSec *= PRICE_INCREASE

            this.showPrices()
            this.renderUpgrades()
            setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)
            setDataToLocalStorage(LocalStorage.multipliers, {
                multiplierPricePerClick: Math.floor(
                    this.multiplierPricePerClick
                ),
                multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
            })
        } else {
            alert('Недостаточно кликов для покупки')
        }
    }

    private renderUpgrades = () => {
        getElementBySelector('#counterPerClick').textContent = String(
            this.upgrades.clickSize
        )
        getElementBySelector('#counterPerSec').textContent = String(
            this.upgrades.clicksPerSecond
        )
    }
}
