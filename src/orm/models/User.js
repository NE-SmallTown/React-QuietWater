/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */

import { Model, attr } from 'redux-orm';

import { QUIETWATEROFHOST_SUCCESS, COMMENT_SUCCESS, Conversation_SUCCESS, REPLY_SUCCESS } from '../../actions';

// TODO 提供一个action给用户去dispatch,action的内容为初始化宿主环境的登录用户(即当前用户)的信息,这样可以让User.orm响应这个action,创建当前用户的信息的实例
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
      case REPLY_SUCCESS:
      case QUIETWATEROFHOST_SUCCESS:
        const { replies: repliesEntities } = action.response;

        repliesEntities.forEach(({ author }) => {
          !User.hasId(author.userId) && User.create({ ...author });
        });

        break;
      case COMMENT_SUCCESS:
      case Conversation_SUCCESS:
        const commentsEntities = action.type === COMMENT_SUCCESS ? action.response.comments : action.response;

        for (let { author, replyTo } of commentsEntities) {
          if (!User.hasId(author.userId)) {
            User.create({ ...author });
          }

          if (replyTo && !User.hasId(replyTo.userId)) {
            User.create({ ...replyTo });
          }
        }

        break;
    }
  }
};
