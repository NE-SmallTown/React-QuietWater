/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/24 by Administrator
 */

import warning from 'warning';

export default newHash => {
  if (__DEV__) {
    warning(typeof newHash !== 'undefined', `getNewLocationHrefWithHash needs one arguments which is new Hash`);

    warning(!newHash.includes('#'), `newHash doesn't need # in the first,but passed in ${newHash}`);
  }

  const curHrefWithoutSpecialCharacters = location.href.substring(0, /[?|#]/g.exec(location.href).index);

  return curHrefWithoutSpecialCharacters + '#' + newHash;
};
