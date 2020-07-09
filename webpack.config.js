const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import("webpack").WebpackOptions} */

const config = {
    // ? Controls settings for the hot-reload development server
    devServer: {
        contentBase: path.resolve(__dirname, '/dist'),
        compress: true,
        port: 3000,
    },
    // ? The entry point files, add new key: value pairs for any other js files you want
    entry: {
        main: './src/main.ts',
    },
    // ? Settings for where the compressed and minified output files will go
    output: {
        filename: 'main.js',
        path: path.resolve(`${__dirname}/dist`),
    },
    // ? Plugins to use alongside Webpack
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './src/pages/index.pug'),
        }),
    ],
    // ? What loaders to apply to what files
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.ts$/,
                loaders: ['ts-loader'],
            },
            {
                test: /\.pug$/,
                loaders: ['pug-loader'],
            },
        ],
    },
    // ? Allows you to use @/ as an alias for the ./src directory
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // ? Override the config object with production only options
    }
    if (argv.mode === 'production') {
        // ? Override the config object with production only options
    }

    return config;
};
