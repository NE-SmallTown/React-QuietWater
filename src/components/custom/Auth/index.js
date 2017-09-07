/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/27 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import Message from '../../Message';
import configAuth from '../../Auth';

import globalConfig from '../../../globalConfig';
import { checkUserIdAndRedirect, isCurUserIdEquals, isCurUserLoginNameEquals } from '../../../utils/auth';
import { isLoggedAndTokenIsValid } from '../../../security/authService';

export let OnlyHasLoginedCanClick;

require([`../../../language/${globalConfig.languageName}`], languageObj => {
  OnlyHasLoginedCanClick = configAuth({
    type: 'event',
    needPreVertify: false,
    vertifyFunc: checkUserIdAndRedirect,
    onVertifyFail: () => {
      Message.error(languageObj.default.OperationError.whenNotLogin, 2);
    }
  });
});

export const OnlyHasLoginedCanSee = props => {
  const Auth = configAuth({ vertifyFunc: isLoggedAndTokenIsValid });

  return <Auth {...props} />;
};

export const OnlyCurrentUserCanSee = (() => {
  let loginName, userId;

  // 虽然用户可以把自己的localstorage的loginName改成要访问的那个用户的loginName就可以访问那个用户的主页了
  // 但是他无法进行实际有效的操作,最多只是让一些按钮显示出来(比如添加按钮,修改按钮),这就和绕过前端验证直接发包一样
  // 所以这里获取loginName,userId等等不需要对token进行decode,没那个必要,只要保证它通不过后端的验证,他也得不到数据或者改不了数据.
  const Auth = configAuth({
    vertifyFunc: typeof userId === 'undefined'
      ? () => isCurUserLoginNameEquals(() => loginName)
      : () => isCurUserIdEquals(() => userId)
  });

  /* eslint-disable */
  return props => {
    loginName = props.loginName;
    userId = props.userId;

    return <Auth {...omit(props, ['userId', 'loginName'])} />;
  };
  /* eslint-enable */
})();

OnlyCurrentUserCanSee.propTypes = {
  userId: PropTypes.string,
  loginName: PropTypes.string
};
OnlyCurrentUserCanSee.displayName = 'OnlyCurrentUserCanSee';
