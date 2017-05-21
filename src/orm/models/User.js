/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/1
 */

import { Model, attr } from 'redux-orm';

import { QUIETWATEROFHOST_SUCCESS, COMMENT_SUCCESS, Conversation_SUCCESS } from '../../actions';

export default class User extends Model {
  static modelName = 'User'

  static options = {
    idAttribute: 'userId'
  }

  static fields = {
    id: attr(),
    name: attr(),
    avatarUrl: attr(),
    loginName: attr(),
    roleName: attr(),
    userId: attr(),
    userName: attr(),
    userToken: attr()
  }

  // 虽然下面的处理完全一样,但是api可能变动,所以没有提取成公共方法
  static reducer (action, User, session) {
    switch (action.type) {
      case QUIETWATEROFHOST_SUCCESS:
        const { replies: repliesEntities } = action.response;

        repliesEntities.forEach(({ author }) => {
          !User.withId(author.userId) && User.create({ ...author });
        });

        break;
      case COMMENT_SUCCESS:
      case Conversation_SUCCESS:
        const commentsEntities = action.type === COMMENT_SUCCESS ? action.response.comments : action.response;

        for (let { author, replyTo } of commentsEntities) {
          if (!User.withId(author.userId)) {
            User.create({ ...author });
          } else if (replyTo && !User.withId(replyTo.userId)) {
            User.create({ ...replyTo });
          }
        }

        break;
    }
  }
};
