const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './app/main.js'
    ]
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },
    {
      test: /\.[s]?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
    },
    {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(jpe?g|png|gif|ico)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 4
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            },
          },
        }
      ]
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.[chunkhash].js", minChunks:Infinity }),
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html'
    })
  ]
};
