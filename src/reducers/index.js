/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/30 by Heaven
 */

import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';

import filter from './filter';
import orm from '../orm';

const rootReducer = combineReducers({
  filter,
  orm: createReducer(orm)
});

export default rootReducer;
