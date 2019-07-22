const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rendererConfig = {
  entry: './src/renderer/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'renderer.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }] },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['url-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules|neutrino[\\/]lib/,
        use: [
          'eslint-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-flow',
                [
                  '@babel/preset-env',
                  {
                    targets: '>1%, not ie 11, not op_mini all'
                  }
                ]
              ],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['renderer']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};

module.exports = rendererConfig;
