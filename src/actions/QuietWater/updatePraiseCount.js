/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/14 by Heaven
 */

export const UPDATE_PRAISECOUNT = 'UPDATE_PRAISECOUNT';

export const updatePraiseCount = (replyId, newPraiseCount) => dispatch => dispatch({
  type: UPDATE_PRAISECOUNT,
  replyId,
  newPraiseCount
});
