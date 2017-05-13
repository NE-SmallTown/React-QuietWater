/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/1
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class LanguageProvider extends React.PureComponent {
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
