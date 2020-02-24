/**
 * Webpack configuration for PBot.
 * @author Joseph Pahl
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
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
                // {
                //     test: /\.scss$/,
                //     use: [
                //         {
                //             loader: 'style-loader',
                //             options: {
                //             }
                //         },
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 url: false,
                //                 sourceMap: false
                //             }
                //         },
                //         {
                //             loader: 'sass-loader',
                //             options: {
                //                 sourceMap: false,
                //             }
                //         }
                //     ],
                // },
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                // SmoothieChart: 'smoothie/smoothie.js'
                // ApexCharts: 'apexcharts/dist/apexcharts.min.js'
                Chart: 'chart.js/dist/Chart.bundle.min.js'
            })
        ]
    }
];
