/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/30 by Heaven
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
    replyTo: fk('User', 'replyToMe')
  }

  // action.response.entities
  static reducer (action, Comment, session) {
    switch (action.type) {
      case COMMENT_SUCCESS:
      case Conversation_SUCCESS:
        const commentEntities = action.type === COMMENT_SUCCESS ? action.response.comments : action.response;

        const replyId = action.type === COMMENT_SUCCESS ? action.replyId : action.response[0].reply;

        for (let comment of commentEntities) {
          if (!Comment.hasId(comment.id)) {
            const commonCreate = { ...comment, reply: replyId, author: comment.author.userId };

            if (comment.replyTo) {
              commonCreate.replyTo = comment.replyTo.userId;
            }

            Comment.create(commonCreate);
          }
        }

        break;
      case ADD_COMMENT
    }
  }
}

