/**
 * v0.0.1 参考antd的grid，移除移动端布局部分（flex）
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2016/12/13
 */

import React from 'react';
import classNames from 'classnames';
import splitObject from '../../util/splitObject';

import gridCss from './antd-grid.css';

export default class Row extends React.PureComponent {
  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    gutter: React.PropTypes.number,
    prefixCls: React.PropTypes.string
  };

  static defaultProps = {
    gutter: 0,
    prefixCls: 'row'
  };

  /*
  * [gutter = 0] (number) : 栅格间隔
  * [prefixCls = 'row'] (string) : Row的默认样式的前缀，方便改成其他的grid布局，如bs-row
  * */
  render () {
    const [ { className, gutter, style, children, prefixCls }, restProps ] = splitObject(this.props,
      [ 'className', 'gutter', 'style', 'children', 'prefixCls' ]);

    // 合并基础样式('row')和用户自定义样式
    const styleNames = classNames(prefixCls);

    // 合并行间距（如果有）和用户自定义的style
    const rowStyle = gutter > 0 ? Object.assign({}, {
      marginLeft: gutter / -2,
      marginRight: gutter / -2
    }, style) : style;

    // 为Row下面每一列设置基础样式
    const cols = React.Children.map(children, col => {
      if (!col) {
        return null;
      }

      // 需要clone节点而不是直接改变属性，因为react的节点是immutable的
      // React elements are immutable. Once you create an element, you can't change its children or attributes.
      if (col.props) {
        return React.cloneElement(col, {
          style: gutter > 0 ? Object.assign({}, {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2
          }, col.props.style) : col.props.style
        });
      }

      // 为什么不这样
      /* if (col.props) {
        col.props.style = gutter > 0 ? Object.assign({}, {
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2,
        }, col.props.style) : col.props.style;
      } */

      return col;
    });

    return <div className={className} styleName={styleNames} style={rowStyle} {...restProps}> {cols} </div>;
  };
};
