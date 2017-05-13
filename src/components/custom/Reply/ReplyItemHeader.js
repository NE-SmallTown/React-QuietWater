/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';

import { UserInfoBox, UserLink } from '../User';
import Popover from '../../Popover';

import './ReplyItemHeader.css';

export default class ReplyItemHeader extends React.PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    loginName: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
    replyCreatedTime: PropTypes.string,
    desc: PropTypes.string
  }

  render () {
    const { avatarUrl, loginName, desc, userId, userName, replyCreatedTime } = this.props;

    return (
      <div styleName="wrap">
        <div styleName="authorInfo">
          <Popover
            trigger='click'
            content={
              <UserInfoBox
                avatarUrl={avatarUrl}
                loginName={loginName}
                userId={userId}
                userName={userName}
                desc={desc}
              />
            }
          >
            <div styleName="avatar-wrap"><img src={avatarUrl} styleName="avatar" /></div>
          </Popover>

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
