"use strict";
const counter = document.querySelector('#counter');
const button = document.querySelector('#button');
// const changeTheme = document.querySelector('#theme')
const clicker = new Clicker(counter, button);
clicker.startGame();
