var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: [
    './config/polyfills.ts',
    './src/main.ts'
  ],

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
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
        loaders: ['awesome-typescript-loader', '@angularclass/hmr-loader', 'angular2-template-loader'],
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
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(helpers.root('dist', 'vendor-manifest.json'))
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(helpers.root('dist', 'polyfills-manifest.json'))
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'dist/index.html'
    }),
    new AddAssetHtmlPlugin([
      { filepath: 'dist/polyfills.dll.js', includeSourcemap: false },
      { filepath: 'dist/vendor.dll.js', includeSourcemap: false }
    ])
  ],

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    profile: true,
    progress: true
  }
};
