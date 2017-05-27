/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/26 by Heaven
 */

import globalConfig from '../../globalConfig';
import { isLoggedAndTokenIsValid } from '../../security/authService';

export const checkUserIdAndRedirect = () => {
  if (!isLoggedAndTokenIsValid()) {
    location.href = globalConfig.api.hostUserLoginUrl;

    return false;
  }

  return true;
};
