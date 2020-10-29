const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './app/app.ts',
    devtool: 'inline-source-map',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
    },
    resolve: {
      modules:[path.resolve('./app'), path.resolve('./node_modules')],
      extensions: [ '.ts', '.js'],
    },
    externals: [nodeExternals()],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(
        {
          terserOptions: {
            mangle: true,
            compress: {}
          }
        }
      )],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(), // to clean previous build
      new CopyPlugin([
          { from: 'assets', to: 'assets' },
        ])
    ]
  };