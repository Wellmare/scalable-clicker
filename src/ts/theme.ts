enum themes {
    dark = 'dark',
    light = 'light',
}

class Theme {
    private currentTheme: themes = themes.light

    constructor(private themingChangeElement: HTMLElement) {
        this.start()
    }

    start = (): void => {
        this.getThemeFromLS()

        this.themingChangeElement.addEventListener('click', () => {
            this.setTheme(
                this.currentTheme === themes.light ? themes.dark : themes.light
            )
        })
    }

    getThemeFromLS = (): void => {
        const theme = getDataFromLocalStorage('theme') || themes.light
        this.setTheme(theme)
    }

    setTheme = (theme: themes): void => {
        this.currentTheme = theme
        setDataToLocalStorage('theme', theme)

        switch (theme) {
            case themes.dark:
                document.body.classList.add('dark')
                break
            case themes.light:
                document.body.classList.remove('dark')
                break
        }
    }
}
