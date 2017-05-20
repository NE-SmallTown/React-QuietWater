/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import globalConfig from '../../../globalConfig';

const hostUserUrlPrefix = globalConfig.router.user.PREFIXURL;
const postfixIsId = globalConfig.router.user.postfixIsIdOrLoginName === 'id';

export default class UserLink extends React.PureComponent {
  static propTypes = {
    userName: PropTypes.string,
    userId: PropTypes.string,
    loginName: PropTypes.string,
    className: PropTypes.string
  }

  render () {
    const { userName, userId, loginName, className } = this.props;

    return (
      <Link to={`${hostUserUrlPrefix}${postfixIsId ? userId : loginName}`} className={className}>
        {userName}
      </Link>
    );
  }
};
