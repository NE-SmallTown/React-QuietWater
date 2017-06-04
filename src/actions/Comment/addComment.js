/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/6/4 by Heaven
 */

export const ADD_COMMENT = 'ADD_COMMENT';

// TODO 添加评论应该是添加到最后一页的最后一项,而不是在追加到当前页末尾
export const addComment = fields => dispatch => dispatch({
  type: ADD_COMMENT,
  fields
});
