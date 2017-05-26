/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/19 by Heaven
 */

import { createOrmSelector } from './global';

export const getPagination = replyId => createOrmSelector(
  session =>
    session.Pagination.withId(replyId)
    ? session.Pagination.withId(replyId).ref
    : undefined
);
