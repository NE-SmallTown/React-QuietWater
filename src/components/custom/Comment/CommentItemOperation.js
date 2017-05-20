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
    replyTo: PropTypes.object,
    onClickReply: PropTypes.func,
    onShowConversation: PropTypes.func
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  handleResponse = () => {
    this.props.onClickReply && this.props.onClickReply();
  }

  handleShowConversation = () => {
    this.props.onShowConversation && this.props.onShowConversation();
  }

  render () {
    const { replyTo } = this.props;

    const { replyText, conversationText } = this.context.quietWaterLanguage.Comment.operationBar;

    return (
      <div styleName="wrap">
        {replyTo &&
          <button styleName="btn" key="cvs" onClick={this.handleShowConversation}>
            <SvgIcon styleName="icon" iconName="icon-conversation3" />

            <span styleName="btnText">{conversationText}</span>
          </button>
        }

        <button styleName="btn" key="rt" onClick={this.handleResponse}>
          <SvgIcon styleName="icon" iconName="icon-response2" />

          <span styleName="btnText">{replyText}</span>
        </button>
      </div>
    );
  }
};

