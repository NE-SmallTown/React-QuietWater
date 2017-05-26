/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/9
 */

import globalConfig from '../../globalConfig';

export const getCurrentUserId = () => localStorage.getItem(globalConfig.localStorage.info2Storage.userId);

export const getCurrentLoginName = () => localStorage.getItem(globalConfig.localStorage.info2Storage.loginName);

export const getCurrentUserRoleName = () => localStorage.getItem(globalConfig.localStorage.info2Storage.roleName);

export * from './getUserInfoIfHaveLogined';
export * from './setUserInfoIfHaveLogined';
