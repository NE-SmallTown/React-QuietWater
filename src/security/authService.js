/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/3/16
 */

import { isTokenExpired } from './jwtUtils';
import globalConfig from '../globalConfig';

// 检查是否登录且token未过期
export const isLoggedAndTokenIsValid = () => {
  const token = this.getToken();
  return !!token && !isTokenExpired(token);
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
