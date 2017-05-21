/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/19 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';

import CommentItemHeaderAndContent from './CommentItemHeaderAndContent';

import './ConversationBox.css';

export default class ConversationBox extends React.PureComponent {
  static propTypes = {
    conversationList: PropTypes.array,
    context: PropTypes.object
  }

  render () {
    const { conversationList } = this.props;

    // 因为ConversationBox是给Modal去渲染的,而Modal的东西是渲染在body下的,所以如果在ConversationBox里去接收
    // quietWaterLanguage这个context是不行的,因为提供context的Provider最顶层是也才是id为root的元素,而Modal渲染
    // 出来的元素并不在root里面
    const { titleText } = this.props.context.quietWaterLanguage.Comment.ConversationBox;

    return (
      <div styleName="wrap">
        <div styleName="title-wrap">
          <span styleName="title">{titleText}</span>
        </div>

        {conversationList.length > 0 &&
          conversationList.map(
            conversation =>
              <CommentItemHeaderAndContent
                key={conversation.id}
                context={this.props.context}
                {...conversation}
              />
          )
        }
      </div>
    );
  }
};

