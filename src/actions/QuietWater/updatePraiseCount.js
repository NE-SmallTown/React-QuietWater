/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/14 by Administrator
 */

export const UPDATE_PRAISECOUNT = 'UPDATE_PRAISECOUNT';

export const updatePraiseCount = (replyId, newPraiseCount) => dispatch => dispatch({
  type: UPDATE_PRAISECOUNT,
  replyId,
  newPraiseCount
});
