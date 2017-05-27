/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/4 by Heaven
 */

import { formatUrl } from 'url-lib';

import globalConfig from '../../globalConfig';
import { CALL_API } from '../../middleware/api';

export const REPLY_REQUEST = 'REPLY_REQUEST';
export const REPLY_SUCCESS = 'REPLY_SUCCESS';
export const REPLY_FAILURE = 'REPLY_FAILURE';

const fetchReply = (queryCondition) => ({
  hostId: queryCondition.hostId,
  [CALL_API]: {
    types: [ REPLY_REQUEST, REPLY_SUCCESS, REPLY_FAILURE ],
    payloads: [ {}, { ...queryCondition }, { } ],
    requestUrl: formatUrl(globalConfig.api.replyUrl, {
      ...queryCondition
    }),
    normalizedPropName: 'replies'
  }
});

export const loadReply = queryCondition =>
  dispatch => dispatch(fetchReply(queryCondition));
