import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/utils/axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { axiosBaseUrl } from '@/config/index';
import CustomComponents from 'components/common/index';

// poc加载
if (process.env.VUE_APP_BUILD_MODE !== 'devops') {
  import('web-gly-plugin/packages').then(({ default: component }) => {
    Vue.use(component);
  });
}

// 注册http请求
Vue.use(axios);
// 注册ui组件
Vue.use(Antd);
// 注册全局组件
Vue.use(CustomComponents);

// 将构建环境挂载到全局 development production devops(移动) poc(浪潮)
Object.defineProperty(Vue.prototype, '$env', {
  value: process.env.VUE_APP_BUILD_MODE
});
// 挂载全局上传uploadUrl 上传时会用到
Object.defineProperty(Vue.prototype, '$uploadUrl', {
  value: axiosBaseUrl.uploadUrl
});
// 挂载全局事件总线 切记在组件销毁阶段取消事件监听
Object.defineProperty(Vue.prototype, '$EventBus', { value: new Vue() });

Vue.config.productionTip = false;

// 将根组件实例挂载到$vm上，可在访问不到组件实例时，通过window属性进行访问
window.$vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
