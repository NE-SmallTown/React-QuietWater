/**
 * v0.0.1
 * 因为网站需要显示头像的主要是用户，所以这里抽象为UserAvatar而不是基础的Avatar
 * 如果需要做活动页用到其他头像，那么肯定直接写html了，也不会用到组件
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/3/9
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './UserAvatar.css';

// 通用的展示用户基本信息（头像，昵称）的组件，注：这里的userName其实是loginName，后面再改过来吧
export default class UserAvatar extends React.PureComponent {
  static propTypes = {
    userName: PropTypes.string,
    loginName: PropTypes.string,
    customClassName: PropTypes.object,
    onHasShowUserInfo: PropTypes.func,
    avatarUrl: PropTypes.string
  };

  static defaultProps = {
    customClassName: {}
  }

  constructor (props) {
    super(props);

    this.state = {
      showLoginBox: false
    };
  }

  // 点击登录按钮时候显示登录框
  onLoginBtnClick = (e) => {
    this.setState({
      showLoginBox: true,
      mousePosition: {
        x: e.pageX,
        y: e.pageY
      }
    });
  }

  _checkShouldTriggerCb () {
    if (typeof this.props.userName !== 'undefined') {
      this.props.onHasShowUserInfo && this.props.onHasShowUserInfo();
    }
  }

  componentDidMount () {
    this._checkShouldTriggerCb();
  }

  componentDidUpdate () {
    this._checkShouldTriggerCb();
  }

  handleLoginSuccess = ({ userId, userName, loginName, avatarUrl }) => {
    console.log(userId, loginName, avatarUrl);

    this.setState({ userId, userName, loginName, avatarUrl });
  }

  render () {
    const { userName, loginName, avatarUrl } = typeof this.props.loginName === 'undefined' ? this.state : this.props;
    const { customClassName: { wrap: warpClassName, avatar: avatarClassName, name: userNameClassName } } = this.props;
    const isUserNameNotUndefined = typeof userName !== 'undefined';
    const isAvatarUrlNotUndefined = typeof avatarUrl !== 'undefined';

    return (
      (isUserNameNotUndefined || isAvatarUrlNotUndefined)
      ? <div styleName="userinfo-wrap" className={warpClassName}>
          { isAvatarUrlNotUndefined &&
            <Link to={`/u/${loginName}`}>
              <img src={avatarUrl} styleName="user-avatar" className={avatarClassName} />
            </Link>
          }
          { isUserNameNotUndefined &&
            <span styleName="user-name" className={userNameClassName}>{userName}</span>
          }
        </div>
      : null
    );
  }
}
