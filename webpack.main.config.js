module.exports = config => {
  // TODO: eslint error when removing neutrino/lib
  config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules|neutrino[\\/]lib/,
    use: [
      'eslint-loader',
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  });

  return config;
};
