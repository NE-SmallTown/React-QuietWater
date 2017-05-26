/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/9 by Heaven
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
    desc: PropTypes.string,
    coverUrl: PropTypes.string
  }

  static defaultProps = {
    desc: '这是我描述自己的内容'
  }

  render () {
    const { avatarUrl, loginName, userId, userName, desc, coverUrl = avatarUrl } = this.props;

    return (
      <div styleName="wrap">
        <div>
          <div styleName="cover-wrap">
            <img styleName="cover" src={coverUrl} />
          </div>

          <div styleName="info-wrap">
            <img styleName="avatar" src={avatarUrl} />

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
