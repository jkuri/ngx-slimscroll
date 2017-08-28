const { resolve } = require('path');

function root(filePath) {
  return resolve(__dirname, filePath);
}

module.exports = function (options) {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [ root('node_modules/rxjs'), root('node_modules/@angular') ] },
        { test: /\.ts$/, use: [ { loader: 'awesome-typescript-loader', options: { configFileName: 'src/tsconfig.json', module: 'commonjs' } }, { loader: 'angular2-template-loader' } ], exclude: [/\.aot\.ts$/] },
        { test: /\.json$/, loader: 'json-loader', exclude: [root('src/index.html')] },
        { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: [root('src')] },
        { test: /\.css$/, use: ['to-string-loader', 'css-loader'], exclude: [root('src/styles')] },
        { test: /\.scss$|\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'], include: [root('src/styles') ] },
        { test: /\.scss$|\.sass$/, use: ['to-string-loader', 'css-loader', 'sass-loader'], exclude: [root('src/styles')] },
        { test: /\.html$/, loader: 'raw-loader', exclude: [root('src/index.html')] }
      ]
    },
    performance: { hints: false },
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
}
