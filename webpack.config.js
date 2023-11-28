const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist/umd'),
        filename: 'hybridforms.min.js',
        library: {
            type: 'umd',
            name: 'HybridFormsJS'
        }
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: false
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin({}),
        ]
    },
    externalsPresets: { node: true },
    plugins: [
        new webpack.DefinePlugin({
            process: 'process/browser'
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
    ]
}
