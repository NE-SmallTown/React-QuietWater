/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/26 by Heaven
 */

import isFunction from 'lodash/isFunction';

import globalConfig from '../../globalConfig';
import { isLoggedAndTokenIsValid } from '../../security/authService';
import { getCurrentUserId, getCurrentLoginName } from '../user';

export const checkUserIdAndRedirect = () => {
  if (!isLoggedAndTokenIsValid()) {
    location.href = globalConfig.api.hostUserLoginUrl;

    return false;
  }

  return true;
};

export const isCurUserIdEquals = (id) => getCurrentUserId() === isFunction(id) ? id() : id;

export const isCurUserLoginNameEquals = (loginName) => getCurrentLoginName() === isFunction(loginName) ? loginName() : loginName;
