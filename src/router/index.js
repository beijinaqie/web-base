import Vue from 'vue';
import vuex from '@/store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let otherRouter = [];
const files = require.context('./', true, /\.js$/);
// 路由自动化导入
files.keys().forEach(key => {
  if (key !== './index.js' && files(key).default) {
    otherRouter = [...otherRouter, ...[...files(key).default]];
  }
});

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    children: [...otherRouter],
    component: () => import('views/home/Home')
  }
];

// 本地开发时启用本地登录
if (process.env.VUE_APP_BUILD_MODE !== 'poc') {
  routes.push({
    path: '/login',
    name: 'Login',
    component: () => import('views/login/Login')
  });
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = vuex.state.common.token;
  if (!token && to.meta?.auth) {
    vuex.commit('common/to_login', { to, from, next });
  } else {
    next();
  }
});

export default router;
