/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/1
 */

import { attr, Model, fk } from 'redux-orm';

import { QUIETWATEROFHOST_SUCCESS, UPDATE_PRAISECOUNT, COMMENT_SUCCESS } from '../../actions';

export default class Reply extends Model {
  static modelName = 'Reply'

  static fields = {
    id: attr(),
    name: attr(),
    host: fk('Host', 'replies'),
    author: fk('User', 'replies'),
    commentCount: attr(),
    content: attr(),
    createdTime: attr(),
    excerpt: attr(),
    lastUpdatedTime: attr(),
    /* needCollapse: attr(), */
    praiseCount: attr()
  }

  static reducer (action, Reply, session) {
    switch (action.type) {
      case QUIETWATEROFHOST_SUCCESS:
        const { id: hostId, replies: repliesEntities } = action.response;

        repliesEntities.forEach(reply => {
          // Reply.create({ ...reply, author: reply.author.userId });
          Reply.create({ ...reply, host: hostId, author: reply.author.userId });
        });

        break;
      case COMMENT_SUCCESS:
        const { comments } = action.response;

        看看数组的upate是整体更新还是追加
        Reply.withId(replyId).update({ comments: comments.map(c => c.id) });

        break;
      case UPDATE_PRAISECOUNT:
        const { replyId, newPraiseCount } = action;

        Reply.withId(replyId).update({ praiseCount: newPraiseCount });

        break;
      /* case REPLY_SUCCESS:
        Reply.create(action.response.entities);
        break;
      case UPDATE_REPLY:
        Reply.withId(action.payload.id).update(action.payload);
        break;
      case REMOVE_REPLY:
        const reply = Reply.withId(action.payload);
        reply.delete();
        break; */
    }
  }
};
