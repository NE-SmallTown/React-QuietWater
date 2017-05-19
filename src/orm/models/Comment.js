/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/30
 */

import { oneToOne, fk, attr, Model } from 'redux-orm';

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
    replyTo: fk('User', 'comments'),
    pagination: oneToOne('Pagination', '')
  }

  // action.response.entities
  static reducer (action, Comment, session) {
    switch (action.type) {
      case COMMENT_SUCCESS:
        const { comments: commentEntities } = action.response;

        commentEntities.forEach(comment => {
          Comment.create({ ...comment, reply: action.replyId, author: comment.author.userId });
        });

        break;
      case Conversation_SUCCESS:
        const { conversations: conversationsEntities } = action.response;

        conversationsEntities.forEach(comment => {
          Comment.create({ ...comment, reply: action.replyId, author: comment.author.userId });
        });

        break;
    }
  }
}

