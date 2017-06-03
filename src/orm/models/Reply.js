/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */

import { oneToOne, attr, Model, fk } from 'redux-orm';

import { QUIETWATEROFHOST_SUCCESS, UPDATE_PRAISECOUNT, COMMENT_SUCCESS, REPLY_SUCCESS, CREATE_REPLY } from '../../actions';

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
    praiseCount: attr(),
    pagination: oneToOne('Pagination', 'reply')
  }

  static reducer (action, Reply, session) {
    switch (action.type) {
      case QUIETWATEROFHOST_SUCCESS:
        const { id: hostId, replies: repliesEntities } = action.response;

        repliesEntities.forEach(reply => {
          !Reply.hasId(reply.id) &&
          Reply.create({
            ...reply,
            host: hostId,
            author: reply.author.userId,
            pagination: reply.id
          });
        });

        break;
      case COMMENT_SUCCESS:
        const { comments: newComments, commentCount } = action.response;

        const { replyId } = action;
        const reply = Reply.withId(replyId);

        reply.update({
          commentCount,
          comments: newComments.map(c => c.id)
        });

        break;
      case UPDATE_PRAISECOUNT:
        const { newPraiseCount } = action;

        Reply.withId(action.replyId).update({ praiseCount: newPraiseCount });

        break;
      case REPLY_SUCCESS:
        {
          const { hostId } = action;

          const { replies: newReplies } = action.response;

          newReplies.forEach(reply => {
            Reply.create({ ...reply, host: hostId, author: reply.author.userId });
          });

          break;
        }
      case CREATE_REPLY:
        Reply.create(action.fields);

        break;
      case ADD_COMMENT
        /*
      case UPDATE_REPLY:
        Reply.withId(action.payload.id).update();
        break;
      case REMOVE_REPLY:
        const reply = Reply.withId();
        reply.delete();
        break; */
    }
  }
};
