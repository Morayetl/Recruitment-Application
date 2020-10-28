const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    output: {
      path: path.resolve('dist')
    },
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
        },      
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },          
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: '@svgr/webpack',
              options: {
                babel: false,
                icon: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            'file-loader',
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
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
    plugins: [
      new CleanWebpackPlugin(), // to clean previous build
      new HtmlWebPackPlugin({ 
        template: "./src/index.html",
        favicon: "./src/favicon.png",
      })
    ]
};