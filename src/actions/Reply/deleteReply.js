/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/9/4 by Heaven
 */

export const DELETE_REPLY = 'DELETE_REPLY';

export const deleteReply = replyId => dispatch => dispatch({
  type: DELETE_REPLY,
  id: replyId
});
