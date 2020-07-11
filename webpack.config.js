const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    // ? What loaders to apply to what files
    module: {
        rules: [
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {},
                },
            },
            {
                test: /\.ts$/,
                loaders: ['ts-loader'],
            },
            {
                test: /\.pug$/,
                loaders: ['pug-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|ttf|eot|woff(2)?)$/i,
                loaders: ['file-loader'],
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
        config.module.rules.push(
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            }
        );
    }
    if (argv.mode === 'production') {
        // ? Override the config object with production only options
        config.module.rules.push(
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        );
    }

    return config;
};
