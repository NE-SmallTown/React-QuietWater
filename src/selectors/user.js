/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { createOrmSelector } from './global';

// QS 代表QuerySet的简写
// QS is short for QuerySet
export const getAllUsersQS = createOrmSelector(
  session => session.User.all()
);
