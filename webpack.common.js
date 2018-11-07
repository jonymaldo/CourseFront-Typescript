const path = require('path');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
        app: "./src/assets/js/index.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]

    },
    plugins: [
        new CleanWebPackPlugin(['dist']),
        new HtmlWebPackPlugin({ template: './index.html' }),
        new CopyWebPackPlugin([
            {
                from: './src/components',
                to: 'components',
                toType: 'dir'
            },
            {
                from: './src/data',
                to: 'data',
                toType: 'dir'
            }
        ], {
                ignore: ['*.js', '*.css']
            }),
        new webpack.ProvidePlugin(
            {
                $: 'jquery',
                jquery: 'jquery'
            }),
        new webpack.ProvidePlugin(
            {
                Ractive: ['ractive/ractive.min.js']
            }
        )
    ]
}