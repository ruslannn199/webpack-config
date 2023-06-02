const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const target = isDev ? 'web' : 'browserslist';

const filename = (ext) => (isDev ? `[name].${ext}` : `[contenthash].${ext}`);

module.exports = {
  mode: mode,
  target: target,
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
    assetModuleFilename: 'images/[contenthash][ext]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.ico/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[contenthash][ext]',
        },
      },
      {
        test: /\.(wav|ogg|mp3)$/,
        type: 'asset/resource',
        generator: {
          filename: 'sound/[contenthash][ext]',
        }
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { 
              publicPath: '',
              esModule: isDev,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: !isDev,
    }),
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
    compress: true,
    historyApiFallback: true,
  },
}
