/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';

import UserLink from './UserLink';

import './UserInfoBox.css';

export default class UserInfoBox extends React.PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    loginName: PropTypes.string,
    roleName: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
    userToken: PropTypes.string,
    desc: PropTypes.string
  }

  render () {
    const { avatarUrl, loginName, userId, userName, desc } = this.props;

    return (
      <div styleName="wrap">
        <div>
          <div styleName="cover-wrap">
            <img styleName="cover" src={avatarUrl} />
          </div>

          <div styleName="info-wrap">
            <div styleName="title-wrap">
              <div styleName="userName">
                <UserLink userName={userName} userId={userId} loginName={loginName}>{userName}</UserLink>
              </div>

              <div styleName="desc-wrap"><span styleName="desc">{desc}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
