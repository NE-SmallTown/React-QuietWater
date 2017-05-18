/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/30
 */

import { fk, attr, Model } from 'redux-orm';

import { COMMENT_SUCCESS } from '../../actions';

export default class Comment extends Model {
  static modelName = 'Comment'

  static fields = {
    id: attr(),
    name: attr(),
    reply: fk('Reply', 'comments'),
    author: fk('User', 'replies'),
    content: attr(),
    createdTime: attr(),
    isAuthor: attr(),
    replyTo: fk('User', 'replies'),
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
    }
  }
}

