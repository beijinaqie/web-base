// 手机号正则
export const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

// 邮箱正则 通用性邮箱验证
export const emailReg = /^.*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

// 密码正则 8-32位，并包含数字和大小写字母
export function passwordReg (min = 8, max = 32, options = '') {
  const reg = new RegExp(
    `^(?=.*\\d.*)(?=.*[a-z].*)(?=.*[A-Z].*).{${min},${max}}$`, options
  );
  return reg;
}

// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

// 短横线驼峰命名
export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// 字符串首字母大写
export function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

// 判断类型
export function typeOf (target) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(target)];
}

// 深拷贝
export function deepCopy (data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

// 对输入框进行限制处理
export function validateInput (e) {
  const reg = new RegExp(
    '(^\\d{1,' +
      (e.int ? e.int : 30) +
      '}(\\.\\d{0,' +
      (e.float ? e.float : 10) +
      '}){0,' +
      (e.float === 0 ? 0 : 1) +
      '})',
    ''
  );
  // eslint-disable-next-line no-eval
  return eval(
    `this.${e.objData} =
      String(this.${e.objData})
      .match(${reg})
      ? String(this.${e.objData}).match(${reg})[0]
      : ''`
  );
}

// 元素滚动
export function scrollTop (el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll (start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}
