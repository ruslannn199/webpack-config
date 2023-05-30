const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const target = isDev ? 'web' : 'browserslist';

const filename = (ext) => (isDev ? `[name].${ext}` : `[contenthash].${ext}`);

module.exports = {
  mode: mode,
  target: target,

  output: {
    assetModuleFilename: 'images/[contenthash][ext]',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[contenthash][ext]',
        },
      },
      {
        test: /\.(wav|ogg|mp3)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sound/[contenthash][ext]',
        }
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
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
