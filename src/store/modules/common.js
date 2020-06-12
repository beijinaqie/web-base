import * as types from '@/store/mutation-types';
import { getUserInfo } from 'apis/common';

const state = {
  token: JSON.parse(localStorage.getItem('TOKEN')) ?? '',
  userInfo: JSON.parse(localStorage.getItem('USER_INFO')) ?? ''
};

const getters = {
  permission(state) {
    return (key) => state.userInfo[key];
  }
};

const mutations = {
  [types.SET_USER_INFO](state, payload) {
    state.userInfo = payload ?? {};
    localStorage.setItem('USER_INFO', JSON.stringify(payload) ?? '');
  },
  [types.SET_TOKEN](state, payload) {
    state.token = payload ?? '';
    localStorage.setItem('TOKEN', JSON.stringify(payload) ?? '');
  },
  [types.CLEAR](state) {
    state.token = '';
    state.userInfo = '';
    localStorage.clear();
    sessionStorage.clear();
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
