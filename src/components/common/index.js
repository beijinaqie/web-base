// 自动化注册全局组件

export default {
  install(Vue) {
    const files = require.context('./', true, /\.vue$/);

    files
      .keys() // 返回 ['./Preview.vue']
      .map(key => files(key)) // 返回[Module:{default:{name,reated...}}]
      .map(({ default: component }) => {
        Vue.component(component.name, component);
      });
  }
};
