/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/21 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { UserAvatarPopover, UserLink } from '../User';

import './CommentItemHeaderAndContent.css';

export default class CommentItemHeaderAndContent extends React.PureComponent {
  static propTypes = {
    author: PropTypes.object,
    content: PropTypes.string,
    createdTime: PropTypes.string,
    isAuthor: PropTypes.bool,
    replyTo: PropTypes.object,
    context: PropTypes.object
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  render () {
    const { author, isAuthor, replyTo, createdTime, content } = this.props;

    const quietWaterLanguageContext = this.context.quietWaterLanguage || this.props.context.quietWaterLanguage;
    const { replyToText, isAuthorText } = quietWaterLanguageContext.Comment.headerTitle;

    return ([
      <div styleName="header" key="cih">
        <UserAvatarPopover {...author} />

        <UserLink styleName="userName" {...author}>{author.userName}</UserLink>

        {isAuthor && <span styleName="isAuthorText" key="iat">{`( ${isAuthorText} )`}</span>}

        {replyTo &&
          [
            <span key="rtt" styleName="replyToText">{replyToText}</span>,

            <UserLink key="rt" styleName="userNameOfReplyTo" {...replyTo}>{replyTo.userName}</UserLink>
          ]
        }

        <span key="ct" styleName="createdTime">{createdTime}</span>
      </div>,
      <div styleName="content" key="cic" dangerouslySetInnerHTML={{ __html:  DOMPurify.sanitize(content) }} />
    ]);
  }
};
