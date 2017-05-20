/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { createOrmSelector } from './global';

export const getCommentList = replyId => createOrmSelector(
  session =>
    session.Reply.withId(replyId)
    ? session.Reply.withId(replyId).comments.toRefArray().map(
      comment => ({
        ...comment,
        author: session.User.withId(comment.author).ref,
        replyTo: session.User.withId(comment.replyTo).ref
      })
    )
    : []
);

// 因为目前的模式是显示对话的所有记录,所以这里不需要对id进行区分,所有这里叫userId1,userId2
export const getConversationList = (replyId, userId1, userId2) => createOrmSelector(
  session => session.Reply.withId(replyId)
    ? session.Reply.withId(replyId).comments
    .filter(comment =>
      (comment.author === userId1 && comment.replyTo === userId2) ||
      (comment.author === userId2 && comment.replyTo === userId1)
    )
    .toRefArray().map(
      comment => ({
        ...comment,
        author: session.User.withId(comment.author).ref,
        replyTo: session.User.withId(comment.replyTo).ref
      })
    )
    : []
);
