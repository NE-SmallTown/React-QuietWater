/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */

import globalConfig from './globalConfig';
import reverseKV from './utils/reverseKV';

// 将一个业务数据中的key映射到localstorage的key上的对象
export const info2Storage = globalConfig.localStorage.info2Storage;

// 将一个localstorage的key映射到业务数据中的key上的对象
export const storage2Info = { ...reverseKV(info2Storage) };
