/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/9 by Heaven
 */

import { info2Storage } from '../../globalParam';

export const setUserInfoIfHaveLogined = (userInfo) => {
  Object.keys(info2Storage).forEach((info2StorageKey) => {
    localStorage.setItem(info2Storage[info2StorageKey], userInfo[info2StorageKey]);
  });
};
