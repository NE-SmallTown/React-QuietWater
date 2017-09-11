/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/19 by Heaven
 */

import { attr, Model } from 'redux-orm';

import globalConfig from '../../globalConfig';
import { COMMENT_SUCCESS, QUIETWATEROFHOST_SUCCESS, REPLY_SUCCESS } from '../../actions';

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
        const { replyId, pageSize, currentPage } = action;

        const totalCount = (action.response.comments || []).length;

        if (Pagination.hasId(replyId)) {
          Pagination.withId(replyId).update({ currentPage, pageSize, totalCount });
        } else {
          Pagination.create({ id: replyId, currentPage, pageSize, totalCount });
        }

        break;

      case QUIETWATEROFHOST_SUCCESS:
        {
          const { hostId } = action;

          const totalCount = action.response.replies.length;

          Pagination.create({
            id: hostId,
            currentPage: 1,
            pageSize: globalConfig.paginations.replyList.pageSize,
            totalCount
          });
        }

        break;
      case REPLY_SUCCESS:
        {
          const { hostId, pageSize, currentPage } = action;

          const totalCount = action.response.replies.length;

          Pagination.withId(hostId).update({ currentPage, pageSize, totalCount });
        }

        break;
    }
  }
};
