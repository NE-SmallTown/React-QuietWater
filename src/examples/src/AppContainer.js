/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Router } from 'react-router';

import { handleHashChange } from '../../index';

export default class AppContainer extends React.PureComponent {
  static propTypes = {
    routes : PropTypes.object.isRequired
  }

  componentDidMount () {
    browserHistory.push('/');
  }

  render () {
    const { routes } = this.props;

    // because we are testing,so there is no neccerary to use <Provider> of react-redux
    return (
      <Router history={browserHistory} children={routes} onUpdate={handleHashChange} />
    );
  }
};
