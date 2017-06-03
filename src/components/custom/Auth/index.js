/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/27 by Heaven
 */

import React from 'react';

import Message from '../../Message';
import configAuth from '../../Auth';

import globalConfig from '../../../globalConfig';
import { checkUserIdAndRedirect } from '../../../utils/auth';
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
