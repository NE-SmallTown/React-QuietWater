/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/2
 */

import { formatUrl, formatQuery } from 'url-lib';
import isPlainObject from 'lodash/isPlainObject';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

import '../security/security';
import { getCurrentUserId } from './user';

const initOptions = {
  method: 'GET'
};

// 相关配置参数，用户可以引入networkHelper.js，然后在自己的项目中建立一个js文件，export default network({...})
// 就可以根据自己的项目来定制了
export default ({
  // 默认的请求的url的前缀，如http://xxx.com/api/
  urlPrefix: _urlPrefix,

  // 一般来说后端都会将响应体包裹在一个变量中，如data，所以为了方便取值，需要response.json()[unwrapResponse]
  unwrapResponse: _unwrapResponse,

  // 处理fetch fullfilled返回的数据与业务不符或出错的情况，一般来说，返回的response有诸如error这样的字段需要调用这个函数
  responseErrorKeys: _responseErrorKeys, // 上一行提到的字段，应该为一个数组，如['error', 'code']等
  responseErrorHandler: _responseErrorHandler, // 上一行提到的处理函数

  // fetch fullfilled时的处理函数，用来处理不同的状态码
  responseStatusHandler: _responseStatusHandler,

  // http链接本身的状态码异常（即4xx和5xx的情况）
  httpStatusExcptionHandler: _httpStatusExcptionHandler,

  // 每个请求都要带上的那些header
  defaultHeaders: _defaultHeaders
}) => {
  _responseErrorKeys = isArray(_responseErrorKeys) ? _responseErrorKeys : [_responseErrorKeys];

  return {
    get: fetch_get,
    post: fetch_post
  };

  // 辅助函数，统一不同情况的调用
  function _fetch (url, options) {
    return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json().then(data => {
          const {
            unwrapResponse,
            responseErrorHandler,
            responseErrorKeys,
            responseStatusHandler
          } = options;

          // 检查返回的数据中是否有某些错误信息字段
          const responseErrorHandlerParams = {};
          responseErrorKeys && responseErrorKeys.forEach(key => {
            data[key] && (responseErrorHandlerParams[key] = data[key]);
          });

          // 检测是否需要调用处理接口返回的数据有错误信息的回调函数
          responseErrorHandler && !isEmpty(responseErrorHandlerParams) && responseErrorHandler(responseErrorHandlerParams);

          // 请求接口成功时检测是否需要调用处理状态码的回调函数，注意，状态包括两类。一类是http(s)响应本身的状态码，一类是响应的实体中的status字段（因为大多数后端会返回一个叫status的字段）
          responseStatusHandler && responseStatusHandler(data.status, res.status);

          return typeof unwrapResponse === 'string' ? data[unwrapResponse] : data;
        });
      } else {
        _httpStatusExcptionHandler && _httpStatusExcptionHandler(res.status);
      }
    }, err => { // 一般fetch会走到error是因为协议不对，跨域，资源路径不对，超时等等，这些也没法知道到底具体是哪种错误，这种一般一个项目的处理是一样的，所以不单独提供接口了，只在最开始初始化的时候提供一个接口
      console.log(`fetch error: ${err}`);
    });
  }

  // 辅助函数，根据url前后缀获取url
  function _getUrl (url) {
    function _get (urlSuffix, urlPrefix = _urlPrefix) {
      return `${urlPrefix}${urlSuffix}`;
    }

    if (typeof url === 'string') {
      url = _get(url);
    } else if (isArray(url)) {
      url = _get(url[1], url[0]);
    } else {
      console.warn(`url must be a string or an array but passed is ${url}`);
      return;
    }

    return url;
  }

  function unifiedFetch ({
     url,
     data,
     unwrapResponse = _unwrapResponse,
     responseErrorKeys = _responseErrorKeys,
     responseStatusHandler = _responseStatusHandler,
     responseErrorHandler = _responseErrorHandler,
     automaticallyAddUrlPrefix = true, // 是否需要加上上面设置的前缀,一般在某条单独的请求中需要覆盖默认值时使用
     fetchOptions = {
       defaultHeaders: _defaultHeaders
     }
  }) {
    let headers;

    if (fetchOptions) {
      headers = new Headers();

      fetchOptions.headers && forEach(fetchOptions.headers, (header, headerKey) => {
        if (isFunction(header)) {
          header = header();
        }

        if (isArray(header)) {
          header.forEach(h => {
            headers.append(headerKey, h);
          });
        } else {
          headers.append(headerKey, header);
        }
      });
    }

    const options = {
      ...initOptions,
      ...fetchOptions,
      unwrapResponse,
      headers,
      responseErrorKeys,
      responseErrorHandler,
      responseStatusHandler: (...args) => {
        _responseStatusHandler(...args); // 先调用全局的状态处理函数(因为一般在这里面进行全局的提示)
        responseStatusHandler(...args); // 然后调用每个请求单独的状态处理函数(不同的调用方处理逻辑不同,比如在不同组件中进行setState)
      }
    };
    const method = options.method.toLowerCase();

    if (method !== 'get' || method !== 'head') {
      fetchOptions && fetchOptions.body && (options.body = fetchOptions.body);
    }

    const finalUrl = automaticallyAddUrlPrefix ? _getUrl(url) : url;
    return _fetch(method === 'get' ? formatUrl(finalUrl, data) : finalUrl, options);
  }

  // 对外暴露的接口
  function fetch_get (url, data) {
    const simpleOptions = {
      url
    };

    // 最简单的情况，只传入url
    if (arguments.length === 1 && typeof url === 'string') {
      return unifiedFetch(simpleOptions);
    }

    // 传入url和data
    if (arguments.length === 2) {
      return unifiedFetch({
        ...simpleOptions,
        data
      });
    }

    // 否则必须传入一个对象
    if (!isPlainObject(url)) {
      console.warn(`get method's arguments must be a string which represents an url or a object which represent options`);
    } else {
      const { headers } = url; // 这里的url实际是配置对象

      return unifiedFetch({
        ...url,
        fetchOptions: {
          headers: { ..._defaultHeaders, ...headers }
        }
      });
    }
  }

  function fetch_post (options) {
    // post只允许传入一个配置对象
    if (!isPlainObject(options)) {
      console.warn(`post method must accept an options plain object but passed is ${options}`);
    } else {
      const { data, headers } = options;

      return unifiedFetch({
        ...options,
        fetchOptions: {
          method: 'post',
          body: formatQuery({ userId: getCurrentUserId(), ...data }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            ..._defaultHeaders,
            ...headers
          }
        }
      });
    }
  }
};
