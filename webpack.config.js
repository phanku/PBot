/**
 * Webpack configuration for PBot.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.2_003_19887de_2020-02-24_09:14:33
 * @since
 */

// Requiring the path module.
const path = require('path');
const webpack = require('webpack');

//
// Webpack configurations
//
module.exports = [
    {
        mode: 'production',
        // resolve: {
        //   root: path.resolve(__dirname)
        // },
        entry: './src/game/Init.js',
        output: {
            filename: 'Pbot.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    use: [
                        {
                            loader: "handlebars-loader"
                        },
                        {
                            loader: 'webpack-handlebars-whitespace-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                    ],
                },
                {
                    test: /\.scss$/i,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                    ],
                },
                {
                    test: /\.txt$/i,
                    use: [
                        {
                            loader: 'raw-loader',
                            options: {
                                esModule: false
                            }
                        }
                    ],
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Chart: 'chart.js/dist/Chart.bundle.min.js'
            })
        ]
    }
];
