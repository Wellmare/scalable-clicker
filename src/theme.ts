import { themes } from './types'
import { getDataFromLocalStorage, setDataToLocalStorage } from './utils'

class Theme {
    public currentTheme: themes = themes.LIGHT

    constructor(private themingChangeElement: HTMLImageElement) {
        this.start()
    }

    start = (): void => {
        this.setThemeFromLS()

        this.themingChangeElement.addEventListener('click', () => {
            this.setTheme(
                this.currentTheme === themes.LIGHT ? themes.DARK : themes.LIGHT
            )
        })
    }

    setThemeFromLS = (): void => {
        const theme = getDataFromLocalStorage<themes>('theme') || themes.LIGHT
        this.setTheme(theme)
    }

    setTheme = (theme: themes): void => {
        this.currentTheme = theme
        setDataToLocalStorage('theme', theme)
    

        switch (theme) {
            case themes.DARK:
                document.body.classList.add('dark')
                
                break
            case themes.LIGHT:
                document.body.classList.remove('dark')
                break
        }
    }
}

export { Theme }
