const counter = document.querySelector('#counter')
const button = document.querySelector('#button')
const changeTheme = document.querySelector('#theme')

const clicker = new Clicker(
    counter as HTMLElement,
    button as HTMLElement,
    changeTheme as HTMLElement
)

clicker.startGame()
