const path = require("path")

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}