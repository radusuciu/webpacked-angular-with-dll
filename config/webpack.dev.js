var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'app': ['./config/polyfills.ts', './src/main.ts']
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    // resolve module file requests by looking for explicit extensions
    // or look for matching files with .js or .ts extensions
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      // handle component-scoped styles specified with styleUrls
      {
        test: /\.css$/,
        include: helpers.root('src'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'dist/index.html'
    })
  ],

  devServer: {
    contentBase: 'dist/',
    host: '0.0.0.0',
    inline: true,
    port: 8080,
    // profile: true,
    progress: true
  }
};
