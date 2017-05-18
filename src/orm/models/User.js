/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/1
 */

import { Model, attr } from 'redux-orm';

import { QUIETWATEROFHOST_SUCCESS } from '../../actions';

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

  static reducer (action, User, session) {
    switch (action.type) {
      case QUIETWATEROFHOST_SUCCESS:
        const { replies: repliesEntities } = action.response;

        repliesEntities.forEach(({ author }) => {
          下面应该要改成update?,因为感觉还有comment也会导致添加用户
          User.create({ ...author });
        });
        break;
    }
  }
};
