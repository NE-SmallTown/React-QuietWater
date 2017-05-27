/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/9 by Heaven
 */

import { storage2Info } from '../../globalParam';

export const getUserInfoIfHaveLogined = () =>
  Object.keys(storage2Info).reduce((ret, storage2InfoKey) => {
    const storage2InfoValue = localStorage.getItem(storage2InfoKey);
    storage2InfoValue !== null && (ret[storage2Info[storage2InfoKey]] = storage2InfoValue);

    return ret;
  }, {})
;
