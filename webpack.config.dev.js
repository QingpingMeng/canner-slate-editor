var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './docs/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new BundleAnalyzerPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              localIdent: '[path]___[name]__[local]___[hash:base64:5]',
              importLoaders: 1,
              modules: true
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: [/\.antd.scss$/, /\.lib.scss$/]
      },
      {
        test: [/\.antd.scss$/, /\.lib.scss$/],
        loaders: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.json$/,
        include: [/node_modules/],
        loader: 'json-loader'
      }
    ]
  }
};
