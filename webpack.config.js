const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = { 
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Development',
            filename: 'index.html',
            inject: 'head',
        }),
    ],
}