/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/9
 */

import { storage2Info } from '../../globalParam';

export const getUserInfoIfHaveLogined = () =>
  Object.keys(storage2Info).reduce((ret, storage2InfoKey) => {
    const storage2InfoValue = localStorage.getItem(storage2InfoKey);
    storage2InfoValue !== null && (ret[storage2Info[storage2InfoKey]] = storage2InfoValue);

    return ret;
  }, {});
;
