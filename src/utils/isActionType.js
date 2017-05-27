/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2016/12/24 by Heaven
 */

/**
 *
 * @param {String} str 要判断的字符串
 * @returns {Boolean} 该字符串是否为ActionType
 */
export default function isActionType (str) {
  if (typeof str === 'string') {
    return [].every.call(str, (ch) => ch.toUpperCase() === ch);
  }

  return false;
}
