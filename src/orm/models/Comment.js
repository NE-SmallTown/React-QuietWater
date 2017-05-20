/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/30
 */

import { fk, attr, Model } from 'redux-orm';

import { COMMENT_SUCCESS, Conversation_SUCCESS } from '../../actions';

export default class Comment extends Model {
  static modelName = 'Comment'

  static fields = {
    id: attr(),
    name: attr(),
    reply: fk('Reply', 'comments'),
    author: fk('User', 'comments'),
    content: attr(),
    createdTime: attr(),
    isAuthor: attr(),
    replyTo: fk('User', 'replyToComments')
  }

  // action.response.entities
  static reducer (action, Comment, session) {
    switch (action.type) {
      case COMMENT_SUCCESS:
        const { comments: commentEntities } = action.response;

        commentEntities.forEach(comment => {
          const commonCreate = { ...comment, reply: action.replyId, author: comment.author.userId };

          if (comment.replyTo) {
            commonCreate.replyTo = comment.replyTo.userId;
          }

          Comment.create(commonCreate);
        });

        break;
      case Conversation_SUCCESS:
        action.response.forEach(comment => {
          Comment.create({ ...comment, reply: action.replyId, author: comment.author.userId });
        });

        break;
    }
  }
}

