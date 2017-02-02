var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/index'
  ],
  module: {
   loaders: [
     {
       test: /\.js?$/, loader: 'babel', exclude: /node_modules/
     },
     {
       test: /\.css$/,
       loaders: [
         'style?sourceMap',
         'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
     ]
     }
   ]
 },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
