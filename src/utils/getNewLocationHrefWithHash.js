/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/24 by Heaven
 */

import warning from 'warning';

export default newHash => {
  if (__DEV__) {
    warning(typeof newHash !== 'undefined', `getNewLocationHrefWithHash needs one arguments which is new Hash`);

    warning(!newHash.includes('#'), `newHash doesn't need # in the first,but passed in ${newHash}`);
  }

  const matchHref = /[?|#]/g.exec(location.href);
  const isHrefWithoutQueryOrAnchor = matchHref === null;

  if (isHrefWithoutQueryOrAnchor) {
    return location.href;
  }

  const indexOfQueryOrAnchor = matchHref.index;
  return location.href.substring(0, indexOfQueryOrAnchor) + '#' + newHash;
};
