/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/9 by Heaven
 */

// copy from https://github.com/ant-design/ant-design/blob/master/components/popover/index.tsx

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import Tooltip from '../tooltip';

export default class Popover extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {}
  };

  static propTypes = {
    title: PropTypes.node,
    content: PropTypes.node,
    prefixCls: PropTypes.string
  }

  getPopupDomNode () {
    return this.tooltip.getPopupDomNode();
  }

  getOverlay () {
    const { title, prefixCls, content } = this.props;

    return (
      <div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>
          {content}
        </div>
      </div>
    );
  }

  render () {
    const props = assign({}, this.props);
    delete props.title;

    return (
      <Tooltip
        {...props}
        ref={ele => { this.tooltip = ele; }}
        overlay={this.getOverlay()}
      />
    );
  }
};
