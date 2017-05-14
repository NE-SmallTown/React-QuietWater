/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/3 by Administrator
 */

import * as quietWater from './QuietWater';

import * as reply from './Reply';

import isActionType from '../utils/isActionType';

export let ActionTypes = [
  quietWater,
  reply
].reduce((ActionTypes, importedAction) => {
  for (let key in importedAction) {
    isActionType(importedAction[key]) && (ActionTypes[key] = importedAction[key]);
  }

  return ActionTypes;
}, {});

export * from './QuietWater';

export * from './Reply';
