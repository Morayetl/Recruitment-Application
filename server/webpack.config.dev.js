const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

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
      //compress: true,
      //port: 8080
    },
    resolve: {
      modules:[path.resolve('./app'), path.resolve('./node_modules')],
      extensions: [ '.ts', '.js'],
    },
    externals: [nodeExternals()],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new NodemonPlugin({nodeArgs:[/*'--inspect'*/]})
    ]
  };