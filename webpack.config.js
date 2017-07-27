const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'code-on-the-wall.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
                'eslint-loader',
            ],
        }],
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'src/includes'),
            path.resolve(__dirname, 'src/includes/common'),
        ],
    },
    plugins: [
        new BabiliPlugin(),
        new HtmlWebpackPlugin({ inject: 'head' }),
    ],
};