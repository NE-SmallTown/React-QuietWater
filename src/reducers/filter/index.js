/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/2/13 by Heaven
 */

import warning from 'warning';

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

export default(state = {
  curQuietWaterHost: {},
  curDispatchingActionType: {}
}, action) => {
  const type = action.type;

  // 找到action.type在filter.js中对应的处理函数
  const handleFunction = mapActionTypeToHandleFunction(type);
  const commonResultState = { ...state, curDispatchingActionType: type };
  // because just now they are the same,but in the future probably changed,so we don't merge them to one
  if (typeof handleFunction === 'undefined') {
    warning(false, `There is no corresponding handleFunction for ${type} type`);

    return commonResultState;
  } else if (handleFunction === normalActionFunction) {
    return commonResultState;
  } else if (handleFunction === notFetchActionFunction) {
    switch (type) {
      default:
        return commonResultState;
    }
  }

  switch (type) {
    /*                          处理所有成功的请求                                 */
    case ActionTypes.QUIETWATEROFHOST_SUCCESS :
    case ActionTypes.COMMENT_SUCCESS:
    case ActionTypes.Conversation_SUCCESS:
      return { ...handleFunction(state, action, SUCCESS_TYPE), curDispatchingActionType: type };

    /*                          处理所有失败的请求                                 */
    case ActionTypes.QUIETWATEROFHOST_FAILURE :
    case ActionTypes.COMMENT_FAILURE:
    case ActionTypes.Conversation_FAILURE:
      return { ...handleFunction(state, action, ERROR_TYPE), curDispatchingActionType: type };

    default:
      return commonResultState;
  }
};
