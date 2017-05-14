/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/4 by Administrator
 */

import { SUCCESS_TYPE, ERROR_TYPE } from './index';

export const handleQuietWaterOfHostType = (state, action, type) => ({
  [SUCCESS_TYPE]: {
    ...state,
    curQuietWaterHost: {
      ...state.curQuietWaterHost,

      // 不同场景下嵌入QuietWater的某个具体项的id,例如对于博客,那么这个id就是某篇文章的id,对于一个音乐系统,那么这个id就是某首歌曲或者歌单的id
      id: action.quietWaterHostId
    }
  },
  [ERROR_TYPE]: {
    ...state,
    curQuietWaterHost: {
      ...state.curQuietWaterHost,
      id: 'error'
    }
  }
}[type]);
