const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
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
    plugins: [
      new HtmlWebPackPlugin({ 
        template: "./src/index.html",
        favicon: "./src/favicon.png"
        //filename: "./index.html"
      })
    ]
};