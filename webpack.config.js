const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  context: resolve(__dirname, 'frontend/components/'),
  entry: {
    chat: './chat_app/chat.js',
    home: './chat_app/home.js',
  },
  output: {
    path: resolve(__dirname, 'frontend/static/frontend/js'),
    filename: '[name].js'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  // `mode` is set to "production" during build process (see package.json).
  mode: 'development',
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'file-loader']
        // Deprecated:
        // use: [{ loader: 'style-loader/url' }, { loader: 'file-loader' }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
        // Deprecated:
        // use: [ { loader: 'file-loader', options: {} } ]
      }
    ]
  },
  // https://webpack.js.org/configuration/resolve
  resolve: {
    modules: ['frontend', 'node_modules'],
    alias: {
      Shared: resolve(__dirname, 'frontend/components/shared/'),
      Attend: resolve(__dirname, 'frontend/components/attend/')
    }
  }
}
