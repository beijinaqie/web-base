const webpack = require('webpack');
const path = require('path');
// 打包优化
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolve = url => {
  return path.join(__dirname, url);
};
const port = process.env.PORT || 9527;

module.exports = {
  // outputDir: process.env.VUE_APP_BUILD_MODE === 'devops' ? 'dist' : 'market',
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
  productionSourceMap: false, // process.env.NODE_ENV === 'production' ? '/market/' : '/'
  publicPath:
    process.env.VUE_APP_BUILD_MODE === 'devops'
      ? process.env.VUE_APP_BASE_URL
      : process.env.NODE_ENV === 'production'
      ? '/billing/'
      : '/',
  devServer: {
    host: require('ip').address(),
    // localhost
    open: true,
    port,
    proxy: {
      '/v1.0.0': {
        target: 'https://106.38.78.204:44503', // http://130.233.24.219:8891 'https://106.38.78.204:44503', // http://192.168.1.27:9100 http://192.168.1.56:10011 绕过网关 //http://indusrcent.ft.internal.virtueit.net/v3/gateway/riiot
        // https://www.caiicloud.com/riiot
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/mock': {
        target: 'http://192.168.1.26', // http://192.168.1.56:10011 绕过网关
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/mock': ''
        }
      }
    }
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
