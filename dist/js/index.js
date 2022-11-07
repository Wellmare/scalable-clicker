"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clicker_1 = require("./clicker");
const counter = document.querySelector('#counter');
const button = document.querySelector('#button');
// const changeTheme = document.querySelector('#theme')
const clicker = new clicker_1.Clicker(counter, button);
clicker.startGame();
