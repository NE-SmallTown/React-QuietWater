/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2016/12/24
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
