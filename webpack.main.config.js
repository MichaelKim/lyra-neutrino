const path = require('path');

const mainConfig = {
  entry: './src/main/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/main'),
    filename: 'main.js'
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
  }
};

module.exports = mainConfig;
