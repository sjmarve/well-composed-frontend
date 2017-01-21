const path = require(`path`);

const vueLoaderConfig = require(`./loader-vue.config`);

module.exports = {
  entry: {
    app: `./app/js/entry-client.js`,
    vendor: [
      `es6-promise`,
      `vue`,
      `vue-router`,
      `vuex`,
      `vuex-router-sync`,
    ],
  },
  output: {
    path: path.resolve(__dirname, `../dist`),
    publicPath: `/dist/`,
    filename: `[name].[chunkhash].js`,
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, `../public`),
    },
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: `vue-loader`,
        options: vueLoaderConfig,
      },
      {
        test: /\.js$/,
        loader: `buble-loader`,
        exclude: /node_modules/,
        options: {
          objectAssign: `Object.assign`,
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: `url-loader`,
        options: {
          limit: 10000,
          name: `[name].[ext]?[hash]`,
        },
      },
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === `production` ? `warning` : false,
  },
};
