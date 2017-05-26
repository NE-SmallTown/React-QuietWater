/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/3/17
 */

import decode from 'jwt-decode';

export function getDecodedInfoOfToken (token) {
  return decode(token);
}

export function getTokenExpirationDate (token) {
  const decoded = getDecodedInfoOfToken(token);
  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp);
  return date;
}

export function isTokenExpired (token) {
  const date = getTokenExpirationDate(token);

  if (date === null) {
    return true;
  }

  return !(date.valueOf() > new Date().valueOf());
}
