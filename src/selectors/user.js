/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/4 by Heaven
 */

import { createOrmSelector } from './global';

// QS 代表QuerySet的简写
// QS is short for QuerySet
export const getAllUsersQS = createOrmSelector(
  session => session.User.all()
);
