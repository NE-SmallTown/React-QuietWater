/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/9
 */

import { info2Storage } from '../../globalParam';

export const setUserInfoIfHaveLogined = (userInfo) => {
  Object.keys(info2Storage).forEach((info2StorageKey) => {
    localStorage.setItem(info2Storage[info2StorageKey], userInfo[info2StorageKey]);
  });
};
