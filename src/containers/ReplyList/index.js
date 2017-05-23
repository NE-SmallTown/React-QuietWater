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

import globalConfig from '../../globalConfig';

import './index.css';

export default class ReplyList extends React.PureComponent {
  static propTypes = {
    replyList: PropTypes.array,
    quietWaterWidth: PropTypes.number
  }

  render () {
    const { replyList, quietWaterWidth } = this.props;

    return (
      <div styleName="wrap" style={globalConfig.styles.replyList}>
        {replyList.map(
          (reply, index) =>
            <ReplyItem
              key={reply.id}
              isFirstReplyItem={index === 0}
              replyWrapElementWidth={quietWaterWidth}
              {...reply}
            />
        )}
      </div>
    );
  }
};
