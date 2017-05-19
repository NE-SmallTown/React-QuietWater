/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/19 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';

export default class ConversationBox extends React.PureComponent {
  static propTypes = {
    conversationList: PropTypes.array
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  render () {
    const { conversationList } = this.props;

    const { titleText } = this.context.quietWaterLanguage.Comment.ConversationBox;

    return (
      <div styleName="wrap">
        <div styleName="title-wrap">
          <span styleName="title">{titleText}</span>
        </div>

        {conversationList.length > 0 &&
          conversationList.map(conversation => <CommentItem key={conversation.id} {...conversation} />)
        }
      </div>
    );
  }
};

