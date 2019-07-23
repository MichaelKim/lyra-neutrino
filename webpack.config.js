const TerserPlugin = require('terser-webpack-plugin');

const m = require('./webpack.main.config');
const r = require('./webpack.renderer.config');

const baseConfig = {
  resolve: {
    alias: {
      fs: 'neutrinojs/lib/fs'
    },
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty',
    __dirname: false
  },
  stats: {
    colors: true
  }
};

if (process.env.NODE_ENV === 'production') {
  baseConfig.mode = 'production';
  baseConfig.optimization = {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  };
} else {
  baseConfig.mode = 'development';
  baseConfig.devtool = '#cheap-module-source-map';
}

const mainConfig = {
  ...m,
  ...baseConfig
};

const rendererConfig = {
  ...r,
  ...baseConfig
};

module.exports = [mainConfig, rendererConfig];
