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
          User.create({ ...author });
        });

        break;
      case COMMENT_SUCCESS:
        const { comments: commentsEntities } = action.response;

        commentsEntities.forEach(({ author, replyTo }) => {
          User.create({ ...author });

          if (replyTo) {
            User.create({ ...replyTo });
          }
        });

        break;
      case Conversation_SUCCESS:
        action.response.forEach(({ author, replyTo }) => {
          User.create({ ...author });

          if (replyTo) {
            User.create({ ...replyTo });
          }
        });

        break;
    }
  }
};
