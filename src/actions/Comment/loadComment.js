/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/17 by Administrator
 */

import { formatUrl } from 'url-lib';

import globalConfig from '../../globalConfig';
import { CALL_API } from '../../middleware/api';

export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAILURE = 'COMMENT_FAILURE';

const fetchComment = (queryCondition) => ({
  replyId: queryCondition.replyId,
  [CALL_API]: {
    types: [ COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAILURE ],
    payloads: [ {}, { ...queryCondition }, { } ],
    requestUrl: formatUrl(globalConfig.api.commentUrl, {
      ...queryCondition
    }),
    normalizedPropName: 'comments'
  }
});

export const loadComment = queryCondition =>
  dispatch => dispatch(fetchComment(queryCondition));
