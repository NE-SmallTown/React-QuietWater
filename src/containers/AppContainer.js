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
import { Provider } from 'react-redux';

import handleHashChange from '../utils/route/handleHashChange';

import '../globalStyles/global.scss';

export default class AppContainer extends React.PureComponent {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <Router history={browserHistory} children={routes} onUpdate={handleHashChange} />
      </Provider>
    );
  }
};
