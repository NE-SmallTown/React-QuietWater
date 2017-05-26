/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/30
 */

import { createSelector } from 'redux-orm';

import orm from '../orm';

// 为了减少模板代码，所有需要selector的地方，都用crateOrmSelector创建selector
// selector的结构为createOrmSelector(selector1, selector2, (orm, selector1Result, selector2Result) => {})

// to reduce biolerplate code,all places where we nedd selector,we use crateOrmSelector to create selector
// selector's example:createOrmSelector(selector1, selector2, (orm, selector1Result, selector2Result) => {...})
export const createOrmSelector = (...args) => createSelector(
  orm,
  state => state.orm,
  ...args
);
