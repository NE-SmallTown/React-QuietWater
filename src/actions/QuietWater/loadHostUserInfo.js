/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/8/14 by Heaven
 */

import { hostUserInfo2StorageStringMap } from '../../globalParam';

export const HOSTUSERINFO = 'HOSTUSERINFO';

export const loadHostUserInfo = () => dispatch => {
  // 因为调用方那边是通过fetch去获取用户信息, 是异步的, 所以这里用setTimeout而不是直接返回这个对象

  setTimeout(() => dispatch({
    type: HOSTUSERINFO,
    fields: {
      ...Object.keys(hostUserInfo2StorageStringMap).reduce((ret, infoKey) => {
        ret[infoKey] = localStorage.getItem(hostUserInfo2StorageStringMap[infoKey]);

        return ret;
      }, {})
    }
  }), 5000);
};
