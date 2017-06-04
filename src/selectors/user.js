/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/4 by Heaven
 */

import { createOrmSelector } from './global';

import { getCurrentUserId } from '../utils/user';

// QS 代表QuerySet的简写
// QS is short for QuerySet
export const getAllUsersQS = createOrmSelector(
  session => session.User.all()
);

export const getCurrentUser = createOrmSelector(
  session => session.User.filter({ userId: getCurrentUserId() }).toRefArray()[0]
);
