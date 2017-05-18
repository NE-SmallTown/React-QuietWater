/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';

import './ReplyItemContent.css';

export default class ReplyItemContent extends React.PureComponent {
  static propTypes = {
    content: PropTypes.string,
    lastUpdatedTime: PropTypes.string,
    isContentExpanded:  PropTypes.bool
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  render () {
    const {
      content,
      isContentExpanded,
      lastUpdatedTime
    } = this.props;

    const { lastUpdatedTimeText } = this.context.quietWaterLanguage.Reply;

    // TODO 移动端看看是否需要将回复里的图片进行懒加载,回复本身就是一组一组的加载的,到时候再看看是否有必要吧
    return (
      <div styleName={`wrap ${isContentExpanded ? 'expanded' : 'folded'}`}>
        <div>
          <span styleName="content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div styleName="lastUpdatedTime">
          <span styleName="lastUpdatedTimeDesc">{lastUpdatedTimeText}</span>

          {lastUpdatedTime}
        </div>
      </div>
    );
  }
};
