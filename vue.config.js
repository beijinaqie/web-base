const webpack = require('webpack');
const path = require('path');
// 打包优化
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolve = url => {
  return path.join(__dirname, url);
};
const port = process.env.PORT || 9527;

module.exports = {
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
  publicPath: process.env.NODE_ENV === 'production' ? '/competition/' : '/',
  devServer: {
    host: require('ip').address(),
    open: true,
    port,
    proxy: {
      '/v1.0.0': {
        target: 'http://192.168.1.27:9100', // http://192.168.1.56:10011 绕过网关
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        // 在这儿添加下面两行
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      })
      //   new BundleAnalyzerPlugin()
    ]
  }
};
