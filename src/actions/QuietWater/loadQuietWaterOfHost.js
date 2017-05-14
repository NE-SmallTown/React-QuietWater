/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { schema } from 'normalizr';
import { formatUrl } from 'url-lib';

import globalConfig from '../../globalConfig';
import { CALL_API } from '../../middleware/api';
import { replySchema } from '../Reply/loadReply';

export const QUIETWATEROFHOST_REQUEST = '@@FILTER/QUIETWATEROFHOST_REQUEST';
export const QUIETWATEROFHOST_SUCCESS = '@@FILTER/QUIETWATEROFHOST_SUCCESS';
export const QUIETWATEROFHOST_FAILURE = '@@FILTER/QUIETWATEROFHOST_FAILURE';

export const quietWaterOfHostSchema = new schema.Entity('quietWaterOfHost', {
  ...globalConfig.responseNormalizeSchema.quietWaterOfHost,
  replies: [replySchema]
});

const fetchQuietWaterOfHost = (queryCondition) => ({
  quietWaterHostId: queryCondition.hostId,
  [CALL_API]: {
    types: [ QUIETWATEROFHOST_REQUEST, QUIETWATEROFHOST_SUCCESS, QUIETWATEROFHOST_FAILURE ],
    requestUrl: formatUrl(globalConfig.api.quietWaterOfHostUrl, {
      ...queryCondition
    }),
    // schema: quietWaterOfHostSchema,
    normalizedPropName: 'quietWater'
  }
});

export const loadQuietWaterOfHost = queryCondition =>
  dispatch => dispatch(fetchQuietWaterOfHost(queryCondition));
