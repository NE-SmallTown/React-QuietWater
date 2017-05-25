/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/19 by Administrator
 */

import { attr, Model } from 'redux-orm';

import { COMMENT_SUCCESS } from '../../actions';

export default class Pagination extends Model {
  static modelName = 'Pagination'

  static fields = {
    id: attr(),
    name: attr(),
    currentPage: attr(),
    pageSize: attr(),
    totalCount: attr()
  }

  static reducer (action, Pagination, session) {
    switch (action.type) {
      case COMMENT_SUCCESS:
        const { replyId, pageSize = 10, currentPage } = action;
        const { commentCount: totalCount = action.response.comments.length } = action.response;

        if (Pagination.withId(action.replyId)) {
          Pagination.withId(replyId).update({ currentPage, pageSize, totalCount });
        } else {
          Pagination.create({ id: replyId, currentPage, pageSize, totalCount });
        }

        break;

      // TODO case QUIETWATEROFHOST_SUCCESS
    }
  }
};
