// 自动化注册全局组件

export default {
  install(Vue, opts) {
    const files = require.context('./', false, /\.vue$/);

    files.keys().forEach(key => {
      Vue.component(key.split('.')[1].slice(1), files(key).default);
    });
  }
};
