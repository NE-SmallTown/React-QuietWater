/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/30
 */

import { fk, many, attr, Model } from 'redux-orm';

export default class Comment extends Model {
  static modelName = 'Comment'

  static fields = {
    id: attr(),
    name: attr()
  }

  // action.response.entities
  static reducer (action, Comment, session) {
    switch (action.type) {

    }
  }
}

