/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { attr, Model } from 'redux-orm';
import omit from 'lodash/omit';

import { QUIETWATEROFHOST_SUCCESS } from '../../actions';

export default class Host extends Model {
  static modelName = 'Host'

  static fields = {
    id: attr(),
    name: attr()
  }

  static reducer (action, Host, session) {
    switch (action.type) {
      case QUIETWATEROFHOST_SUCCESS:
        const { id: hostId } = action.response;
        const restProps = omit(action.response, ['id', 'replies']);
        // 注意这里的replies这个字段名是不能随便取的,要和Host这个Model里定义的多对多关系的名称相符合,即field里也是叫replies
        // Host.create({ id: hostId, replies: repliesEntities.map(reply => reply.id) });
        Host.create({ id: hostId, ...restProps });
        // Reply.create(action.response.entities.quietWaterOfHost[action.quietWaterHostId]);
        break;
    }
  }
};
