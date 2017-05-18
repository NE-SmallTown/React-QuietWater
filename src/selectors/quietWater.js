/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { createOrmSelector } from './global';

export const getReplyList = hostId => createOrmSelector(
  session =>
    session.Host.hasId(hostId)
    ? session.Host.withId(hostId).replies.toRefArray().map(reply => ({ ...reply, author: session.User.withId(reply.author).ref }))
    : []
);
