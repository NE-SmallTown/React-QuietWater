/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/9/6 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../../SvgIcon';

import './Button.css';

const themes = [
  // 经典型： 按钮带有背景颜色和边框
  'classic',

  // 文本型： 用一个文本代表一个按钮，无边框和背景颜色
  'text',

  // 图标型： 用一个图标代表一个按钮，无边框和背景颜色
  'icon',

  // 交互型： 点击后按钮左边出现一个勾勾图标，无边框和背景颜色
  'clickWithLeftIcon'
];

export default class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(themes),
    onClick: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object
  }

  static defaultProps = {
    theme: 'classic'
  }

  constructor (props) {
    super(props);

    this.state = {
      showLeftIcon: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      if (this.props.theme !== 'clickWithLeftIcon' && nextProps.theme === 'clickWithLeftIcon') {
        this.setState({
          showLeftIcon: true
        });
      }
    }
  }

  handleClick = e => {
    const { onClick, theme } = this.props;

    if (theme === 'clickWithLeftIcon') {
      this.setState({
        showLeftIcon: true
      });
    }

    onClick && onClick(e);
  }

  render () {
    const { className, theme, children, style } = this.props;

    const { showLeftIcon } = this.state;

    return (
      <button style={style} styleName={`btn btn-${theme}`} className={className} onClick={this.handleClick}>
        { showLeftIcon && <SvgIcon iconName="icon-tick1" styleName="icon-tick" />}

        {children}
      </button>
    );
  }
};
