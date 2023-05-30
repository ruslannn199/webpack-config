const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const target = isDev ? 'web' : 'browserslist';

module.exports = {
  mode: mode,
  target: target,

  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
  ],

  devtool: isDev ? 'source-map' : 'hidden-nosources-source-map',
  devServer: {
    port: 9000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    open: true,
    hot: isDev,
  },
}
