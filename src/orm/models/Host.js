/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/4 by Heaven
 */

import { oneToOne, attr, Model } from 'redux-orm';
import omit from 'lodash/omit';

import { QUIETWATEROFHOST_SUCCESS, REPLY_SUCCESS, CREATE_REPLY } from '../../actions';

export default class Host extends Model {
  static modelName = 'Host'

  static fields = {
    id: attr(),
    name: attr(),
    pagination: oneToOne('Pagination', 'host')
  }

  static reducer (action, Host, session) {
    switch (action.type) {
      case QUIETWATEROFHOST_SUCCESS:
        {
          const { id: hostId, replies: repliesEntities } = action.response;
          const restProps = omit(action.response, ['id', 'replies']);

          // 注意这里的replies这个字段名是不能随便取的,要和Host这个Model里定义的多对多关系的名称相符合,即field里也是叫replies
          !Host.hasId(hostId) && Host.create({
            id: hostId,
            replies: repliesEntities.map(reply => reply.id),
            pagination: hostId,
            ...restProps
          });
        }

        break;
      case REPLY_SUCCESS:
        {
          const { hostId } = action;

          const { replies: newReplies } = action.response;

          const hostInstance = Host.withId(hostId);

          hostInstance.update({
            replies: hostInstance.replies.toRefArray().map(reply => reply.id).concat(newReplies.map(reply => reply.id))
          });
        }

        break;
      case CREATE_REPLY:
        {
          const additiveReply = action.fields;
          const { hostId } = additiveReply;

          const hostInstance = Host.withId(hostId);

          hostInstance.update({
            replies: hostInstance.replies.toRefArray().map(reply => reply.id).concat(additiveReply.id)
          });
        }

        break;
    }
  }
};
