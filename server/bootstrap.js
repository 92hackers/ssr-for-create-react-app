/**
 * Bootstrap the app
 */

require('ignore-styles');

// babel v7 new form of packages
require('@babel/register')({
  ignore: [ /(node_modules)/ ],
  presets: ['@babel/preset-env', '@babel/preset-react'],  // Enable es6 and jsx transform.
  plugins: ['dynamic-import-node'], // with react-loadable to implement component lazy loading.
  cache: true,
});

require('./index')
