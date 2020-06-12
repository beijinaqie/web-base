import { encrypt } from '@/utils/encrypt';
import { $http } from '@/utils/axios';

/**
 * @desc 登录
 * @param {String}  username
 * @param {String} userPassword
 */
export const login = ({ username, userPassword }) => {
  const password = encrypt(userPassword);
  return $http.post('/custom/v1.0.0/login', { username, password });
};

/**
 * @desc 获取用户信息
 */
export const getUserInfo = () => $http.get('/custom/v1.0.0/custom/self/token');
