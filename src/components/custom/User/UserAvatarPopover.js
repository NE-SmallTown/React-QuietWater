/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/18 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../../Popover';
import { UserInfoBox } from '../User';

import './UserAvatarPopover.css';

export default class UserAvatarPopover extends React.PureComponent {
  static propTypes = {
    loginName: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
    avatarUrl: PropTypes.string,
    desc: PropTypes.string,
    className: PropTypes.string
  }

  render () {
    const { loginName, userId, userName, avatarUrl, desc, className } = this.props;

    return (
      <Popover
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
        <div styleName="avatar-wrap"><img src={avatarUrl} styleName="avatar" className={className} /></div>
      </Popover>
    );
  }
};

