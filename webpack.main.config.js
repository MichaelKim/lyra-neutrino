const path = require('path');

const mainConfig = {
  entry: './src/main/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/main'),
    filename: 'main.js',
    library: 'main'
  },
  module: {
    rules: [
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
                '@babel/preset-env'
              ],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      },
      {
        test: /neutrino[\\/]lib[\\/].+\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }
};

module.exports = mainConfig;
