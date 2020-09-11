/* eslint-disable no-irregular-whitespace */
import * as types from '@/store/mutation-types';
import { getUserInfo } from 'apis/common';

const state = {
  token: localStorage.getItem('user-token') ?? '',
  userInfo: JSON.parse(localStorage.getItem('user-info')) ?? '',
  treeData: ''
};

const getters = {
  permission(state) {
    return key => state.userInfo[key];
  }
};

const mutations = {
  [types.SET_USER_INFO](state, payload) {
    const userInfo = {};
    const userInfoData = payload;
    userInfo.id = userInfoData.userId;
    userInfo.realName = userInfoData.userName;
    userInfo.mail = userInfoData.mail;
    userInfo.noReadCount = userInfoData.noReadCount;
    userInfo.deptName = userInfoData.deptName;
    userInfo.deptId = userInfoData.deptId;
    userInfo.createdTime = userInfoData.createdTime;
    userInfo.cellphone = userInfoData.cellphone;
    userInfo.tenantId = userInfoData.mainId;
    userInfo.roleNames = userInfoData.roleNames;
    userInfo.mainName = userInfoData.mainName;
    userInfo.isAdmin = userInfoData.isAdmin;
    userInfo.status = userInfoData.status;
    userInfo.remark = userInfoData.remark;
    state.userInfo = userInfo ?? {};
    localStorage.setItem('user-info', JSON.stringify(userInfo) ?? '');
  },
  [types.SET_TOKEN](state, payload) {
    state.token = payload ?? '';
    localStorage.setItem('user-token', payload ?? '');
  },
  [types.CLEAR](state) {
    state.token = '';
    state.userInfo = '';
    localStorage.clear();
    sessionStorage.clear();
  },
  [types.TO_LOGIN](state, params) {
    const status = params ? 'next' : 'window';
    const { from, next } = params ?? {};
    const env = process.env.VUE_APP_BUILD_MODE;
    if (env === 'development' || env === 'production') {
      if (status === 'next') {
        next({
          path: '/login',
          query: {
            redirect: from.fullPath
          }
        });
      } else {
        window.$vm.$router.push({
          path: '/login',
          query: {
            redirect: window.$vm.$route.fullPath
          }
        });
      }
    } else if (env === 'poc') {
      // 浪潮
      // 跳转前记录当前地址
      localStorage.setItem('redirect-url', window.location.href);
      window.location.href =
        'https://www.caiicloud.com/auth?clientId=67054d37-ff29-4173-874c-8611eba73023&redirectUrl=https://riiot.caiicloud.com/auth/index.html&islangchao=0';
    } else if (env === 'devops') {
      // 移动
      // window.location.href = `${process.env.VUE_APP_BASE_URL}login`;
      if (status === 'next') {
        next({
          path: '/login',
          query: {
            redirect: from.fullPath
          }
        });
      } else {
        window.$vm.$router.push({
          path: '/login',
          query: {
            redirect: window.$vm.$route.fullPath
          }
        });
      }
    }
  },
  [types.UPGRADE_USER_INFO]() {
    console.log(state.userInfo);
    state.userInfo = JSON.parse(localStorage.getItem('user-info')) ?? '';
    console.log(state.userInfo);
  }
};

const actions = {
  async updateUserInfo({ commit, state }) {
    if (!state.token) return;
    const { success, data } = await getUserInfo(state.token);
    if (!success) return;
    commit(types.SET_USER_INFO, data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
