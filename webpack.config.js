const path = require('path');
const webpack = require('webpack');

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
        ],
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
    ],
};