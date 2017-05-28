/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/28 by Heaven
 */

import ReactScroll from 'react-scroll';

import globalConfig from '../../globalConfig';

export default function handleHashChange () {
  const { hash } = window.location;

  if (hash !== '') {
    setTimeout(() => {
      const hashName = `${hash.replace('#', '')}`; // h means header

      if (document.querySelector(`[name=${hashName}]`)) {
        ReactScroll.scroller.scrollTo(hashName);
      } else {
        // when we at first load the page by enter a url with replyItemId anchor in the address bar,it will
        // trigger router's onUpdate(i.e this function),but on that time the replyList is fetching,so we can't
        // call scrollTo the corresponding item,so we call scrollTo asynchronously and it maybe is not accurate,
        // because we don't know the duration between start fetch and render replyList to screen,so we just can
        // estimate the time(here it is 1000).

        // NOTE: Because we don't create a single route to dispaly one reply item,so we can't locate it accurately
        // and this means that the reply item we can only locate by using a url with replyItemId anchor is in
        // the **first** page.
        // TODO make reply even comment item have their single route and exhibition page
        setTimeout(() => ReactScroll.scroller.scrollTo(hashName), 1000);
      }

      // because here the hashName format is 'qw_122323_' + something,so we slice start from 3
      sessionStorage.setItem(globalConfig.sessionStorage.keyOfCurrentReplyItemHash, hashName.slice(3, hashName.lastIndexOf('_')));
    }, 0);
  }
}
