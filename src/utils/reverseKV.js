/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/9
 */

// 返回一个新对象，将一个对象的k与v交换
export default (obj) =>
  Object.keys(obj).reduce((ret, objKey) => {
    ret[obj[objKey]] = objKey;

    return ret;
  }, {});
;
