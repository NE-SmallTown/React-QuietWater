/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/3/26
 */

import globalConfig from '../globalConfig';
import networkHelper from './networkHelper';
import { API_PREFIX, API_P_PREFIX } from '../globalParam';
import { getToken } from '../security/authService';

// 处理接口本身返回的status字段
const responseStatusHandler = globalConfig.api.responseStatusHandler;

// 处理http响应的状态码的异常
const httpStatusHandler = globalConfig.api.httpStatusHandler;

// 处理接口返回的数据中含有error字段的情况
const responseErrorHandler = globalConfig.api.responseErrorHandler;

// 普通接口
export const network = networkHelper({
  urlPrefix: API_PREFIX,
  unwrapResponse: 'data',
  responseErrorKeys: ['error'],
  responseErrorHandler: ({ error: { code: errorCode } }) => {
    console.log(`fetch normal api return a object which includes some error information: ${errorCode}`);

    responseErrorHandler[errorCode] && responseErrorHandler[errorCode]();
  },
  responseStatusHandler: status => responseStatusHandler[status] && responseStatusHandler[status]()
});

// 私有接口
export const priNetwork = networkHelper({
  urlPrefix: API_P_PREFIX,
  defaultHeaders: {
    Authorization: () => `Bearer ${getToken()}`
  },
  unwrapResponse: 'data',
  responseErrorKeys: ['error'],
  responseErrorHandler: ({ error: { code: errorCode } }) => {
    console.log(`fetch private api return a object which includes some error information: ${errorCode}`);

    responseErrorHandler[errorCode] && responseErrorHandler[errorCode]();
  },
  responseStatusHandler: (httpStatus, dataStatus) => responseStatusHandler[dataStatus] && responseStatusHandler[dataStatus](),
  httpStatusExcptionHandler: status => httpStatusHandler[status] && httpStatusHandler[status]()
});
