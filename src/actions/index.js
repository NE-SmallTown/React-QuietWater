/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/3 by Heaven
 */

// 为了方便扩展,所以虽然action creator有很多相似的地方,但是没有使用工厂模式
import * as quietWater from './QuietWater';

import * as reply from './Reply';

import * as comment from './Comment';

import isActionType from '../utils/isActionType';

export let ActionTypes = [
  quietWater,
  reply,
  comment
].reduce((ActionTypes, importedAction) => {
  for (let key in importedAction) {
    isActionType(importedAction[key]) && (ActionTypes[key] = importedAction[key]);
  }

  return ActionTypes;
}, {});

export * from './QuietWater';

export * from './Reply';

export * from './Comment';
