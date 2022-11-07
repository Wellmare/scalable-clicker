const path = require("path")

module.exports = {
    entry: "./dist/js/index.js",
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'main.js'
    },
}