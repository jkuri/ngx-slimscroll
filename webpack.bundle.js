const path = require('path');
const root = path.resolve(__dirname);
const webpack = require('webpack');

module.exports = {
  resolve: { extensions: ['.js'] },
  entry: path.join(root, 'lib/index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(root, 'bundles'),
    publicPath: '/',
    filename: 'ngx-slimscroll.umd.js',
    libraryTarget: 'umd',
    library: 'ngx-slimscroll',
    umdNamedDefine: true
  },
  externals: [/^\@angular\//, /^rxjs\//]
};
