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
    isContentTooLong: PropTypes.bool,
    lastUpdatedTime: PropTypes.string
  }

  render () {
    const {
      content,
      isContentTooLong,
      lastUpdatedTime
    } = this.props;

    return (
      <div styleName={`wrap ${isContentTooLong ? 'expanded' : ''}`}>
        <div>
          <span styleName="content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <div styleName="lastUpdatedTime">{lastUpdatedTime}</div>
      </div>
    );
  }
};
