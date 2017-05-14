/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * 注意antd的栅格和bs的栅格的标准是不同的
 * Date: 2016/12/13
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import splitObject from '../../util/splitObject';

import gridCss from './antd-grid.css';

const stringOrNumber = PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]);
const objectOrNumber = PropTypes.oneOfType([ PropTypes.object, PropTypes.number ]);

export default class Col extends React.PureComponent {
  static propTypes = {
    span: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber
  };

  static defaultProps = {
    offset: 0,
    push: 0,
    pull: 0,
    prefixCls: 'col'
  };

  /*
   * [span] (number)              : 栅格占位格数，为 0 时相当于 display: none
   * [offset = 0] (number)	      : 栅格左侧的间隔格数，间隔内不可以有栅格
   * [push = 0] (number)          : 栅格向右移动格数
   * [pull = 0] (number)	        : 栅格向左移动格数
   * [xs] (number|object)	        : <768px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * [sm] (number|object)	        : ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * [md](number|object)	        : ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * [lg] (number|object)	        : ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
   * [prefixCls = 'col'] (string) : Col的默认样式的前缀，方便改成其他的grid布局，如bs-col
  * */
  render () {
    const props = this.props;

    const [ { span, offset, push, pull, className, children, prefixCls }, restProps ] = splitObject(props,
      [ 'span', 'offset', 'push', 'pull', 'className', 'children', 'prefixCls' ]);

    let colTypeClassObj = {};

    [ 'xs', 'sm', 'md', 'lg' ].forEach(colType => {
      // 为number的例子：<Col xs={2} >Col</Col>
      // 为object的例子：<Col xs={{ span: 5, offset: 1 }} >Col</Col>
      let colTypeProps = {};

      if (typeof props[colType] === 'number') {
        colTypeProps.span = props[colType];
      } else if (typeof props[colType] === 'object') {
        colTypeProps = props[colType] || {};
      }

      // 调用的时候只是像上面那样写xs=xxx，但是render出来应该是下方的colTypeClassObj
      // 所以之前写的xs=xxx要去掉，没什么用
      delete restProps[colType];

      colTypeClassObj = Object.assign({}, colTypeClassObj, {
        [`${prefixCls}-${colType}-${colTypeProps.span}`]: colTypeProps.span !== undefined,
        [`${prefixCls}-${colType}-offset-${colTypeProps.offset}`]: colTypeProps.offset,
        [`${prefixCls}-${colType}-push-${colTypeProps.push}`]: colTypeProps.push,
        [`${prefixCls}-${colType}-pull-${colTypeProps.pull}`]: colTypeProps.pull
      });
    });

    const styleNames = classNames({
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull
    }, colTypeClassObj);

    return <div className={className} styleName={styleNames} {...restProps}>{children}</div>;
  }
}
