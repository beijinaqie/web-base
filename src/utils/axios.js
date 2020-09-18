import axios from 'axios';

const Axios = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
});

// 正在进行中的请求列表
const reqList = [];
const duration = 500;

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = (reqList, url, cancel, params, errorMessage = '') => {
  for (const [index, req] of reqList.entries()) {
    if (req.url === url && req.params === params) {
      req.cancel(req.errorMessage);
      reqList.splice(index, 1);
    }
  }
  reqList.push({
    url,
    cancel,
    errorMessage,
    params
  });
};

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = (reqList, url) => {
  reqList.splice(
    reqList.findIndex(req => req.url === url),
    1
  );
};

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    // console.log(config);
    // 在发送请求之前做些什么
    if (window.$vm.$store?.state?.common?.token) {
      config.headers.Authorization = window.$vm.$store.state.common.token ?? '';
    }
    let cancel;
    // 设置cancelToken对象
    config.cancelToken = new axios.CancelToken(function(c) {
      cancel = c;
    });
    // 阻止重复请求。当发起一个新的相同请求时，上一个请求会被阻止掉
    const params = JSON.stringify(config.params) + JSON.stringify(config.data);
    stopRepeatRequest(reqList, config.url, cancel, params);
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    // 请求成功后1s后移除请求里面的列表
    setTimeout(() => {
      allowRequest(reqList, response.config.url);
    }, duration);
    return response.data;
  },
  error => {
    if (error.config) {
      // 请求失败后1s后移除请求里面的列表
      setTimeout(() => {
        allowRequest(reqList, error.config.url);
      }, duration);
    }
    // 对响应错误做点什么
    return Promise.reject(error.data);
  }
);

const $http = {
  post(api, params, opts = {}) {
    return new Promise((resolve, reject) => {
      Axios.post(api, params, opts)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get(api, params, opts = {}) {
    return new Promise((resolve, reject) => {
      Axios.get(api, {
        params,
        ...opts
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(api, params, opts = {}) {
    return new Promise((resolve, reject) => {
      Axios.put(api, params, opts)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // delete 方法时，分为{ params }和{ data }两种传参方式
  delete(api, params, opts = {}) {
    const configObj = {};
    if (params && params.params) {
      Object.assign(configObj, { params: params.params });
    }
    if (params && params.data) {
      Object.assign(configObj, { data: params.data });
    }
    return new Promise((resolve, reject) => {
      Axios.delete(api, configObj, opts)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  patch(api, params, opts = {}) {
    const configObj = {};
    if (params && params.params) {
      Object.assign(configObj, { params: params.params });
    }
    if (params && params.data) {
      Object.assign(configObj, params.data);
    }
    return new Promise((resolve, reject) => {
      Axios.patch(api, configObj, opts)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export { $http };

export default {
  install(Vue) {
    Vue.prototype.$http = $http;
  }
};
