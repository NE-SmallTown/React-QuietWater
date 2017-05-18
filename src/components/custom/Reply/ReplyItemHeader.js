/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';

import { UserLink, UserAvatarPopover } from '../User';

import './ReplyItemHeader.css';

export default class ReplyItemHeader extends React.PureComponent {
  static propTypes = {
    loginName: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
    replyCreatedTime: PropTypes.string,
    avatarUrl: PropTypes.string,
    desc: PropTypes.string
  }

  render () {
    const { loginName, avatarUrl, desc, userId, userName, replyCreatedTime } = this.props;

    return (
      <div styleName="wrap">
        <div styleName="authorInfo">
          <UserAvatarPopover
            avatarUrl={avatarUrl}
            desc={desc}
            loginName={loginName}
            userName={userName}
            userId={userId}
          />

          <div styleName="otherInfo">
            <div styleName="userName-wrap">
              <UserLink styleName="userName" userName={userName} userId={userId} loginName={loginName}>{userName}</UserLink>
            </div>

            <div styleName="replyCreatedTime">
              {replyCreatedTime}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
