/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/6/3 by Heaven
 */

export const CREATE_REPLY = 'CREATE_REPLY';

export const createReply = fields => dispatch => dispatch({
  type: CREATE_REPLY,
  fields
});
