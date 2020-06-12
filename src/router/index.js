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
  ...otherRouter,
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/Login/Login')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = vuex.state.common.token;
  if (!token && to.meta?.auth) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;
