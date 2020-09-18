/* eslint-disable no-irregular-whitespace */
import * as types from '@/store/mutation-types';

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
    state.userInfo = payload ?? {};
    localStorage.setItem('user-info', JSON.stringify(payload) ?? '');
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
