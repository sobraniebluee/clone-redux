const path = require("path")

module.exports = {
    entry: "./src/index.ts",
    mode: "production",
    module: {
        rules: [
            {
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: "c-redux.js",
        library: 'credux',
        path: path.resolve(__dirname, "dist")
    }
}