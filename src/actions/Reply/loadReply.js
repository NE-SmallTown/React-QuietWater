/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { schema } from 'normalizr';

export const replySchema = new schema.Entity('replies', {
  author: new schema.Entity('author', {}, { idAttribute: 'userId' })
});
