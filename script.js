const counter = document.querySelector('#counter')
const button = document.querySelector('#button')

const prevCount = Clicker.getDataFromLocalStorage('clicks')

const clicker = new Clicker(counter, button)

clicker.startGame(prevCount)