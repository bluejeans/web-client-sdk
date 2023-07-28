const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createStyledComponentsTransformer =
  require('typescript-plugin-styled-components').default
const styledComponentsTransformer = createStyledComponentsTransformer()

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: __dirname + '/src/index.tsx',
  output: {
    path: __dirname + '/output',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: path.join(__dirname, 'node_modules'),
        include: [
          path.join(__dirname, '/src/'),
          path.join(__dirname, '/assets/'),
        ],
        options: {
          configFile: path.join(__dirname, 'tsconfig.json'),
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            include: [path.join(__dirname, '/assets/')],
            options: {
              limit: 100000,
              name: '/assets/icons/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
      path: './output/',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      __SDK_PACKAGE_VERSION__: JSON.stringify(
        require('./node_modules/@bluejeans/web-client-sdk/package.json')
          .version,
      ),
    })
  ],
  devServer: {
    port: 8800,
    server: {
      type: 'https',
    },
    allowedHosts: ['localhost'],
  },
  bail: true,
  node: {
    __dirname: false,
    __filename: false,
  },
}
