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
          User.create({ ...author });
        });
        break;
    }
  }
};
