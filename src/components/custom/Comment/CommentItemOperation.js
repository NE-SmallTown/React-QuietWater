/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/18 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../../SvgIcon';

import './CommentItemOperation.css';

export default class CommentItemOperation extends React.PureComponent {
  static propTypes = {
    replyTo: PropTypes.object
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  handleResponse = () => {
    console.log('准备回复');
  }

  handleShowConversation = () => {
    console.log('准备用modal显示这两个人之间的对话');
  }

  render () {
    const { replyTo } = this.props;

    const { replyText, conversationText } = this.context.quietWaterLanguage.Comment.operationBar;

    return (
      <div styleName="wrap">
        {replyTo &&
          <button styleName="btn" key="cvs" onClick={this.handleShowConversation}>
            <SvgIcon iconName="icon-conversation3" />

            {conversationText}
          </button>
        }

        <button styleName="btn" key="rt" onClick={this.handleResponse}>
          <SvgIcon iconName="icon-response2" />

          {replyText}
        </button>
      </div>
    );
  }
};

