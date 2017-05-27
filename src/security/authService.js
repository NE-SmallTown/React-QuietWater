/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/3/16 by Heaven
 */

import { isTokenExpired } from './jwtUtils';
import globalConfig from '../globalConfig';

// 检查是否登录且token未过期
export const isLoggedAndTokenIsValid = () => {
  const token = getToken();

  let isExpired;
  try {
    isExpired = isTokenExpired(token);
  } catch (e) {
    if (e.name === 'InvalidTokenError') {
      return false;
    }
  }

  return !!token && !isExpired;
};

export const setToken = (token) => {
  if (token) {
    return localStorage.setItem(globalConfig.localStorage.info2Storage.userToken, token);
  }
};

export const getToken = () => {
  return localStorage.getItem(globalConfig.localStorage.info2Storage.userToken);
};

export const logout = () => {
  localStorage.removeItem(globalConfig.localStorage.info2Storage.userId);
  return localStorage.removeItem(globalConfig.localStorage.info2Storage.userToken);
};
