interface IUpgrades {
    clicksPerSecond: number
    clickSize: number
}

interface IMultiplierPrices {
    perClick: number
    perSec: number
}

enum selectors {
    perSec = '#per-sec',
    perClick = '#per-click',
}

enum typesUpgrades {
    perClick = 'perClick',
    perSec = 'perSec',
}

const PRICE_INCREASE = 1.75

const defaultPrices = {
    perClick: 10,
    perSec: 50,
}

class Upgrades {
    private upgrades: IUpgrades

    private multiplierPrice: IMultiplierPrices = {
        perClick: 1,
        perSec: 1,
    }

    constructor(
        private decreasePrice: (count: number) => void,
        private getClicks: () => number,
        upgrades: IUpgrades
    ) {
        this.upgrades = upgrades
    }

    public start = () => {
        this.setMultiplierPriceFromLS()
        this.showPrices()

        const listenEventButton = (
            selector: string,
            funcOnClick: () => void
        ): void => {
            getElementBySelector<HTMLButtonElement>(`${selector} button`).addEventListener(
                'click',
                funcOnClick
            )
        }
        listenEventButton(selectors.perClick, () =>
            this.upgrade(typesUpgrades.perClick, 1)
        )
        listenEventButton(selectors.perSec, () =>
            this.upgrade(typesUpgrades.perSec, 1)
        )

        this.renderUpgrades()
    }

    private showPrices = () => {
        const showPrice = (selector: string, price: number) => {
            getElementBySelector<HTMLParagraphElement>(`${selector} .price`).textContent = String(
                Math.floor(price)
            )
        }
        showPrice(
            selectors.perClick,
            defaultPrices.perClick * this.multiplierPrice.perClick
        )
        showPrice(
            selectors.perSec,
            defaultPrices.perSec * this.multiplierPrice.perSec
        )
    }

    // private upgradeClickSize = (count: number = 1) => {
    //     const totalPrice: number = Math.floor(
    //         defaultPrices.perClick * this.multiplierPricePerClick
    //     )
    //     console.log(totalPrice)

    //     if (this.getClicks() >= totalPrice) {
    //         this.decreasePrice(
    //             defaultPrices.perClick * this.multiplierPricePerClick
    //         )
    //         this.upgrades.clickSize += count
    //         this.multiplierPricePerClick *= PRICE_INCREASE

    //         this.showPrices()
    //         this.renderUpgrades()
    //         setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)
    //         setDataToLocalStorage(LocalStorage.multipliers, {
    //             multiplierPricePerClick: Math.floor(
    //                 this.multiplierPricePerClick
    //             ),
    //             multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
    //         })
    //     } else {
    //         alert('Недостаточно кликов для покупки')
    //     }
    // }

    // private upgradeClicksPerSec = (count: number = 1) => {
    //     const totalPrice: number = Math.floor(
    //         defaultPrices.perSec * this.multiplierPricePerSec
    //     )

    //     if (this.getClicks() >= totalPrice) {
    //         this.decreasePrice(totalPrice)

    //         this.upgrades.clicksPerSecond += count
    //         this.multiplierPricePerSec *= PRICE_INCREASE

    //         this.showPrices()
    //         this.renderUpgrades()
    //         setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)
    //         setDataToLocalStorage(LocalStorage.multipliers, {
    //             multiplierPricePerClick: Math.floor(
    //                 this.multiplierPricePerClick
    //             ),
    //             multiplierPricePerSec: Math.floor(this.multiplierPricePerSec),
    //         })
    //     } else {
    //         alert('Недостаточно кликов для покупки')
    //     }
    // }

    private upgrade = (type: typesUpgrades, count: number) => {
        const totalPrice: number = Math.floor(
            type === typesUpgrades.perClick
                ? defaultPrices.perClick * this.multiplierPrice.perClick
                : defaultPrices.perSec * this.multiplierPrice.perSec
        )

        if (this.getClicks() >= totalPrice) {
            this.decreasePrice(totalPrice)

            if (type === typesUpgrades.perClick) {
                this.upgrades.clickSize += count
                this.multiplierPrice.perClick *= PRICE_INCREASE
            } else {
                this.upgrades.clicksPerSecond += count
                this.multiplierPrice.perSec *= PRICE_INCREASE
            }

            this.showPrices()
            this.renderUpgrades()

            setDataToLocalStorage(LocalStorage.upgrades, this.upgrades)
            setDataToLocalStorage(LocalStorage.multiplierPrice, {
                multiplierPricePerClick: Math.floor(
                    this.multiplierPrice.perClick
                ),
                multiplierPricePerSec: Math.floor(this.multiplierPrice.perSec),
            })
        } else {
            alert('Недостаточно кликов для покупки')
        }
    }

    private renderUpgrades = () => {
        getElementBySelector<HTMLSpanElement>('#counterPerClick').textContent = String(
            this.upgrades.clickSize
        )
        getElementBySelector<HTMLSpanElement>('#counterPerSec').textContent = String(
            this.upgrades.clicksPerSecond
        )
    }

    private setMultiplierPriceFromLS = () => {
        const dataFromLS = getDataFromLocalStorage(
            LocalStorage.multiplierPrice
        )

        if (dataFromLS) {
            this.multiplierPrice.perClick = dataFromLS.multiplierPricePerClick
            this.multiplierPrice.perSec = dataFromLS.multiplierPricePerSec
        }

        // const { multPricePerClick, multPricePerSec } =
    }
}
