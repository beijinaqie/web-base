import { encrypt } from '@/utils/encrypt';
import { $http } from '@/utils/axios';

/**
 * @desc 上传
 */
export const upload = '/v1.0.0/market/file/uploadfile';

/**
 * @desc 每日活跃用户记录接口
 * @param {String} userId
 */
export const staticUser = userId => {
  return $http.post(`/v1.0.0/market/user/${userId}`);
};

/**
 * @desc 登录
 * @param {String}  username
 * @param {String} userPassword
 */
export const login = ({ username, userPassword }) => {
  const env = process.env.VUE_APP_BUILD_MODE;
  let password;
  if (env === 'development' || env === 'production') {
    password = encrypt(userPassword);
  } else {
    password = userPassword;
  }
  return $http.post('/custom/v1.0.0/login', { username, password });
};
/**
 * @desc 获取用户信息
 */
export const getUserInfo = () => $http.get('/custom/v1.0.0/custom/self/token');

/**
 * @desc 获取租户信息
 * @param {String} lesseeId 租户Id
 */
export const getLessessInfo = lesseeId =>
  $http.get(`/v1.0.0/market/lessees/${lesseeId}`);

/**
 * @desc 根据企业id获取企业信息
 * @param {String} enterpriseId 企业Id
 */
export const getEnterpriseInfo = enterpriseId =>
  $http.get(`/v1.0.0/market/enterprises/${enterpriseId}`);

// 数据字典大类id
export const getTreeId = (dictName = '供需类型') =>
  $http.get('/v1.0.0/market/dict-type/type-name', { dictName });

// 数据字典查树
export const getTreeData = dictId =>
  $http.get(`/v1.0.0/market/dict-type/${dictId}/dict-data`, {});

/**
 * @desc 获取完整的字典树
 */
export const getAllTreeData = async () => {
  const { success, data } = await getTreeId();
  if (success) return await getTreeData(data.dictId);
};

const env = process.env.VUE_APP_BUILD_MODE;
let key;
let method;
if (env === 'devops') {
  key = '/riiot/basedata';
  method = 'post';
} else {
  key = '/common';
  method = 'get';
}

/**
 *  省区查询
 * @param {无} data(无)
 */
export const provincialInterface = () =>
  $http[method](`${key}/v1.0.0/area/getAllProvince`);
/**
 *  市区查询
 * @param {provinceId} data(省级ID)
 */

export const cityInterface = data =>
  $http[method](
    `${key}/v1.0.0/area/getCityByProvinceId?provinceId=${data.provinceId}`
  );
/**
 *  *  区县查询
 * @param {cityId} data(市级ID)
 */
export const districtInterface = data =>
  $http[method](`${key}/v1.0.0/area/getDistrictByCityId?cityId=${data.cityId}`);
