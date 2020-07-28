export const statusMap = new Map([
  ['10000', '成功'],
  ['20000', '缺少必要参数'],
  ['30000', '不合法的参数'],
  ['40000', '权限不足'],
  ['45000', '无登陆权限(无token)'],
  ['45001', '无登陆权限(token过期)'],
  ['45002', '无登陆权限(已登出)'],
  ['45003', '无登陆权限(token非法)'],
  ['45004', '登陆失败(用户名密码错误)'],
  ['45005', '无登录权限(无用户id)'],
  ['45006', '非最新token'],
  ['45007', '尚未购买应用，请先购买'],
  ['45008', '应用已到期，请重新购买'],
  ['46000', '已登出'],
  ['47000', '已登录，无需重新登录'],
  ['47001', '权限配置出错(包含两个以上匹配url)'],
  ['50000', '业务处理失败'],
  ['50001', '业务内部错误'],
  ['50002', '业务返回的json数据缺少必要字段code'],
  ['50003', '业务返回的不是json格式数据'],
  ['50004', '请勿重复提交信息'],
  ['60000', '请求路径不合法'],
  ['70000', '请求人数过多'],
  ['80000', '网关内部错误']
]);

const axiosBaseUrl = {};
if (process.env.NODE_ENV === 'development') {
  axiosBaseUrl.url = '';
  axiosBaseUrl.uploadUrl = '';
  axiosBaseUrl.delPrefix = false;
} else {
  axiosBaseUrl.url = '';
  axiosBaseUrl.uploadUrl = '';
  axiosBaseUrl.delPrefix = false;
}

export { axiosBaseUrl };
