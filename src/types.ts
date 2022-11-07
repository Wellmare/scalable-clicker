// Upgrades

export interface IUpgrades {
    clicksPerSecond: number
    clickSize: number
}

export interface IMultiplierPrices {
    perClick: number
    perSec: number
}

export enum Selectors {
    PER_SEC = '#per-sec',
    PER_CLICK = '#per-click',
}

export enum TypesUpgrades {
    PER_CLICK = 'perClick',
    PER_SEC = 'perSec',
}

// Theme

export enum themes {
    DARK = 'dark',
    LIGHT = 'light',
}