/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/1
 */

import omit from 'lodash/omit';

import globalConfig from './globalConfig';
import reverseKV from './utils/reverseKV';

// 将一个业务数据中的key映射到localstorage的key上的对象
export const info2Storage = globalConfig.localStorage.info2Storage;

// 将一个localstorage的key映射到业务数据中的key上的对象
export const storage2Info = { ...reverseKV(info2Storage) };

// 当关闭一个会话/tab的时候将要在localstorage中清除的key（不清除u_id是因为数据库中的id是不会改变的），目的是为了保持数据的准确性
export const wouldClearedStorageItemWhenPageUnload = Object.keys(omit(storage2Info, 'u_id'));

// 请求的后台接口地址的前缀
export const API_PREFIX = globalConfig.api.PREFIX;

// 私有接口地址的前缀，请求这个URL下的接口会带上token
export const API_P_PREFIX = globalConfig.api.P_PREFIX;
