/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/12
 */
import React, { PropTypes } from 'react';

import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import './index.css';

/**
 * 对于那些初始时会占用空间的元素，调用者应该设置switchBySetDisplay标记
 * 而对于那些不占空间的元素，则不需要，通过hidden来控制的话效率更高
 * 因为已经设置为PureComponent了，所以不可见->不可见或者可见->可见都是不会re-render的
 * 所以也就没必要写sCU了
 * */

export default class VisibleRender extends React.PureComponent {
  static propTypes = {
    switchBySetDisplay: PropTypes.bool,
    switchBySetOpacity: PropTypes.bool,
    switchBySetNull: PropTypes.bool,
    isVisible: PropTypes.oneOfType([PropTypes.node, PropTypes.bool, PropTypes.func]),
    children: PropTypes.node,
    styles: PropTypes.object
  }

  render () {
    const { children, styles, switchBySetDisplay, switchBySetOpacity } = this.props;

    let isVisible = this.props.isVisible;
    if (isFunction(isVisible)) {
      isVisible = isVisible();
    }

    if (this.props.switchBySetNull) {
      return isVisible ? children : null;
    }

    const wrapClsName = switchBySetDisplay
      ? (isVisible ? 'showByDisplay' : 'notShowByDisplay')
      : switchBySetOpacity
        ? (isVisible ? 'showByOpacty' : 'notShowByOpacty')
        : (isVisible ? 'showByVisibility' : 'notShowByVisibility'); // 默认采用设置visibility的方式来进行切换

    return (
      isArray(children)
      ? <div styleName={wrapClsName}>{children}</div>
      : React.cloneElement(children, { className: `${styles[wrapClsName]} ${children.props.className}` })
    );
  }
}
