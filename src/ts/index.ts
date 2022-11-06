const counter = document.querySelector('#counter')
const button = document.querySelector('#button')
// const changeTheme = document.querySelector('#theme')

const clicker = new Clicker(counter as HTMLSpanElement, button as HTMLButtonElement)

clicker.startGame()
