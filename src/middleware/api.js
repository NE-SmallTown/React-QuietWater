/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2016/12/21
 */

import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';

import globalConfig from '../globalConfig';
import { isLoggedAndTokenIsValid } from '../security/authService';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API re  sponse have the same shape, regardless of how nested it was.
const callApi = (requestUrl, schema, normalizedPropName) => {
  const { PREFIX: API_PREFIX, P_PREFIX: API_P_PREFIX } = globalConfig.api;

  // judge identity when access private api
  if (requestUrl.startsWith(API_P_PREFIX)) {
    // forbidden when not login or token invalid
    if (isLoggedAndTokenIsValid()) {
      return Promise.reject(new Error('you can\'t access private interface when you don\'t login or token is invalid!'));
    }
  }

  const fullUrl = (requestUrl.indexOf(API_PREFIX) === -1) ? API_PREFIX + requestUrl : requestUrl;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        // 将返回的json中的key里面的下划线转为驼峰命名格式
        // 这里写的是json.data是因为后端返回的所有数据都被一个叫data的对象包裹
        // 这样做的是目的是后端可以少写很多配置项
        const camelizedJson = json.data ? camelizeKeys(json.data) : {};
        const otherInfo = omit(json, 'data'); // 除了data之外的数据，可能是error，status等等

        // 返回的结果一共有4种情况
        let normalizedProp = camelizedJson[normalizedPropName];
        if (typeof normalizedProp === 'undefined') {
          return typeof
            schema === 'undefined'
            ? camelizedJson // 没有提供key和schema，则返回原始数据
            : { ...normalize(camelizedJson, schema), ...otherInfo }; // 没有提供key但提供了schema，则对原始数据进行范式化
        } else {
          // 提供了key但没有提供schema,则返回normalizedProp(注意这将导致丢掉otherInfo信息,如果不想这样,则不应指定key)
          if (typeof schema === 'undefined') {
            return normalizedProp;
          }

          // 提供了key和schema，则对这个key对应的对象进行范式化
          return { ...normalize(normalizedProp, schema), ...otherInfo };
        }
      })
    );
};

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { requestUrl } = callAPI;
  const { schema, types } = callAPI;
  let { payloads } = callAPI;

  if (typeof requestUrl === 'function') {
    requestUrl = requestUrl(store.getState());
  }

  if (typeof requestUrl !== 'string') {
    throw new Error('Specify a string requestUrl URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error(`Expected an array of three action types but passed in ${types}`);
  }
  types.some(type => {
    if (typeof type !== 'string') {
      throw new Error(`Expectedaction type be string but passed in ${type}`);
    }
  });

  if (typeof payloads !== 'undefined') {
    if (!Array.isArray(payloads) || payloads.length !== 3) {
      throw new Error(`Expected an array of three payloads but passed in ${payloads}`);
    }

    payloads.some(payload => {
      if (!isPlainObject(payload)) {
        throw new Error(`Expected payload to be object but passed in ${payload}`);
      }
    });
  } else {
    payloads = [{}, {}, {}];
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;
  const [ requestPayload, successPayload, failurePayload ] = payloads;

  next(actionWith({ ...requestPayload, type: requestType }));

  // 有了下面这步，就不用在actionCreator里面的返回函数里去写fetch了，只要保证action里面有[CALL_API]就行了
  // 中间件会帮我们去fetch.大多数情况下，actionCreator返回的action是一个函数，thunk中间件判断action为函数
  // 时会调用这个函数并将dispatch传入
  return callApi(requestUrl, schema, action[CALL_API].normalizedPropName).then(
    response => next(actionWith({
      type: successType,
      response,
      ...successPayload
    })),
    error => {
      console.error(`dispatch ${failureType} cause ${error} error!`);

      return next(actionWith({
        type: failureType,
        error: error.message || 'request error!',
        ...failurePayload
      }));
    }
  );
};
