/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/3 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';

import { ReplyItem } from '../../components/custom/Reply';

import './index.css';

export default class ReplyList extends React.PureComponent {
  static propTypes = {
    replyList: PropTypes.array,
    quietWaterWidth: PropTypes.number
  }

  render () {
    const { replyList, quietWaterWidth } = this.props;

    return (
      <div styleName="wrap">
        {replyList.map(
          reply => <ReplyItem key={reply.id} replyWrapElementWidth={quietWaterWidth} {...reply} />
        )}
      </div>
    );
  }
};
