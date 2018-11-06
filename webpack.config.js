/* eslint-env node */

module.exports = {
    entry: './src/index.mjs',
    output: {
        path: __dirname + '/dist',
        filename: 'code-on-the-wall.js',
    },
    module: {
        rules: [{
            test: /\.mjs$/,
            include: [
                __dirname + '/src',
            ],
            use: [
                'babel-loader',
                'eslint-loader',
            ],
        }],
    },
    resolve: {
        modules: [
            'node_modules',
            './src',
            './src/includes',
            './src/includes/common',
            './src/includes/loaders',
        ],
    },
    devtool: 'source-map',
    mode: 'production',
};