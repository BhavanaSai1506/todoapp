const path = require('path');
const webpackMerge = require('webpack-merge');

const {dev, prod} = require('@ionic/app-scripts/config/webpack.config');

const customConfig = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      './node_modules',
      path.resolve(__dirname, '../core'),
    ],
    alias: {
      "@core": path.resolve(__dirname, '../core/'),
    }
  }
};

module.exports = {
  dev: webpackMerge(dev, customConfig),
  prod: webpackMerge(prod, customConfig),
};

// https://robferguson.org/blog/2017/11/22/working-with-typescript-webpack-and-ionic-3/
