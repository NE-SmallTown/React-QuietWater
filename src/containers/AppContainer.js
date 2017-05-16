/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/1
 */
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

import '../globalStyles/global.scss';

function handleHashChange () {
  const { hash } = window.location;

  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(`qw_${id}`);

      if (element) {
        element.scrollIntoView();
      }
    }, 0);
  }
}

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
