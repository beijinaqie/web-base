const webpack = require('webpack');
const path = require('path');
// 打包优化
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolve = url => {
  return path.join(__dirname, url);
};
const port = process.env.PORT || 9527;

module.exports = {
  assetsDir: 'static',
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('apis', resolve('src/apis'))
      .set('common', resolve('src/common'));
  },
  productionSourceMap: false,
  publicPath: '/',
  devServer: {
    host: require('ip').address(),
    // localhost
    open: true,
    port
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        // 在这儿添加下面两行
        'window.Quill': 'quill/dist/quill.js',
        // eslint-disable-next-line quote-props
        Quill: 'quill/dist/quill.js'
      })
      //   new BundleAnalyzerPlugin()
    ]
  }
};
