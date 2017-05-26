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

export const QUIETWATEROFHOST_REQUEST = '@@FILTER/QUIETWATEROFHOST_REQUEST';
export const QUIETWATEROFHOST_SUCCESS = '@@FILTER/QUIETWATEROFHOST_SUCCESS';
export const QUIETWATEROFHOST_FAILURE = '@@FILTER/QUIETWATEROFHOST_FAILURE';

const fetchQuietWaterOfHost = (queryCondition) => ({
  quietWaterHostId: queryCondition.hostId,
  [CALL_API]: {
    types: [ QUIETWATEROFHOST_REQUEST, QUIETWATEROFHOST_SUCCESS, QUIETWATEROFHOST_FAILURE ],
    requestUrl: formatUrl(globalConfig.api.quietWaterOfHostUrl, {
      ...queryCondition
    }),
    normalizedPropName: 'quietWater'
  }
});

export const loadQuietWaterOfHost = queryCondition =>
  dispatch => dispatch(fetchQuietWaterOfHost(queryCondition));
