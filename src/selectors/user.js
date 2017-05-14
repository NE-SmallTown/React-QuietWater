/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { createOrmSelector } from './global';

export const getAllUsersQS = createOrmSelector(
  session => session.User.all()
);
