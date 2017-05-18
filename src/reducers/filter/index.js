/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/2/13
 */

import { ActionTypes } from '../../actions';
import * as allFiltersTypes from './typeOfAllFilterHandlers';

// 定义三种接口状态，不同的处理action的type的函数的返回值都以此为key，方便扩展
export const REQUEST_TYPE = Symbol('fetch_request');
export const SUCCESS_TYPE = Symbol('fetch_success');
export const ERROR_TYPE = Symbol('fetch_error');

// 普通的reducer，即那些的不在filter.js中的reducer
const normalActionFunction = Symbol('NORMALACTION');

// state会存在于filter中，但是不属于fetch类型的reducer，比如播放歌曲的fetch在NeAplayer组件内部，并不通过redux
const notFetchActionFunction = Symbol('NOTFETCHACTION');

// 找到action.type在filter.js中对应的处理函数
const mapActionTypeToHandleFunction = type => {
  if (type.startsWith('@@FILTER/')) {
    const functionType = type.replace('@@FILTER/', '');
    const keyOfFunction = functionType.substring(0, functionType.indexOf('_')).toLowerCase();

    for (let functionName in allFiltersTypes) {
      if (functionName.toLowerCase().includes(keyOfFunction)) {
        return allFiltersTypes[functionName];
      }
    }
  } else if (type.startsWith('@@FILTER@@NOTFETCH')) {
    return notFetchActionFunction;
  }

  // 因为所有的action都会触发filter.js导出的reducer，所以针对那些不在filter.js中处理的，返回normalActionFunction避免下面的warn
  return normalActionFunction;
};

// 存储所有在filter.js中处理action.type的函数
const allHandles = {};

export default(state = {
  curQuietWaterHost: {

  }
}, action) => {
  const type = action.type;

  // 找到action.type在filter.js中对应的处理函数
  const handleFunction = mapActionTypeToHandleFunction(type);
  if (typeof handleFunction === 'undefined') {
    console.warn(`There is no corresponding handleFunction for ${type} type`);

    return state;
  } else if (handleFunction === normalActionFunction) {
    return state;
  } else if (handleFunction === notFetchActionFunction) {
    switch (type) {
      default:
        return state;
    }
  }

  allHandles[type] = allHandles[type] || handleFunction;

  switch (type) {
    /*                          处理所有成功的请求                                 */
    case ActionTypes.QUIETWATEROFHOST_SUCCESS :  // reply列表
      return handleFunction(state, action, SUCCESS_TYPE);

    /*                          处理所有失败的请求                                 */
    case ActionTypes.QUIETWATEROFHOST_FAILURE :  // reply列表
      return handleFunction(state, action, ERROR_TYPE);

    default:
      return state;
  }
};
