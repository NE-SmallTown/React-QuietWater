/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class LanguageProvider extends React.Component {
  static propTypes = {
    language: PropTypes.object,
    children: PropTypes.node
  };

  static childContextTypes = {
    quietWaterLanguage: PropTypes.object
  };

  getChildContext () {
    return {
      quietWaterLanguage: {
        ...this.props.language
      }
    };
  }

  render () {
    return React.Children.only(this.props.children);
  }
};
