/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/27
 */

import Message from '../../Message';
import configAuth from '../../Auth';

import globalConfig from '../../../globalConfig';
import { checkUserIdAndRedirect } from '../../../utils/auth';

export let OnlyHasLoginedCanClick;

require([`../../../language/${globalConfig.languageName}`], languageObj => {
  OnlyHasLoginedCanClick = configAuth({
    needPreVertify: false,
    type: 'event',
    onVertifyFail: () => {
      Message.error(languageObj.default.OperationError.whenNotLogin, 2);
    },
    vertifyFunc: checkUserIdAndRedirect
  });
});
