/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/19 by Administrator
 */

import { createOrmSelector } from './global';

export const getPagination = replyId => createOrmSelector(
  session =>
    session.Pagination(replyId)
    ? session.Reply.withId(replyId).ref
    : {}
);
