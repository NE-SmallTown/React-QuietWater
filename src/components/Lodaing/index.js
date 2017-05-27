/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/9 by Heaven
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import isArray from 'lodash/isArray';

import globalConfig from '../../globalConfig';

import './index.css';

class Loading extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    actionTypeOfStartFetching: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.array.isRequired]),
    actionTypeOfFinishFetching: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.array.isRequired]),
    startFetching: PropTypes.bool,
    finishFetching: PropTypes.bool,
    className: PropTypes.string
  }

  constructor (props) {
    super(props);

    this.state = {
      startFetching: false,
      finishFetching: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.startFetching === true) {
        this.handleStartFetching();
      } else if (nextProps.finishFetching === true) {
        this.handleFinishFetching();
      }
    }
  }

  handleStartFetching = () => {
    this.setState({ startFetching: true, finishFetching: false });
  }

  handleFinishFetching = () => {
    this.setState({ finishFetching: true });
  }

  // 因为有的组件并不是采用redux进行fetch，所以针对这种组件这里传过去两个回调
  _addFlags = ele => React.cloneElement(ele, {
    onStartFetching: this.handleStartFetching,
    onFinishFetching: this.handleFinishFetching
  })

  render () {
    const { children, className, actionTypeOfStartFetching, actionTypeOfFinishFetching } = this.props;
    const { startFetching, finishFetching } = this.state;

    let childElement = children;
    if (typeof actionTypeOfStartFetching === 'undefined' && typeof actionTypeOfFinishFetching === 'undefined') {
      childElement =
        isArray(children)
        ? React.Children.map(childEle => this._addFlags(childEle))
        : this._addFlags(childElement);
    }

    return (
      startFetching
      ? finishFetching
        ? childElement
        : <div styleName="wrap" className={className}>{globalConfig.loading.commentList.getComponent()}</div>
      : null
    );
  }
}

const judgeTypeIsTrue = (type, typeList) => {
  if (!isArray(typeList)) {
    return type === typeList;
  }

  return typeList.some(t => t === type);
};

const mapStateToProps = (state, { actionTypeOfStartFetching, actionTypeOfFinishFetching }) => {
  const { filter: { curDispatchingActionType } } = state;
  const ret = {};

  if (judgeTypeIsTrue(curDispatchingActionType, actionTypeOfStartFetching)) {
    ret.startFetching = true;
  }

  if (judgeTypeIsTrue(curDispatchingActionType, actionTypeOfFinishFetching)) {
    ret.finishFetching = true;
  }

  return ret;
};

export default connect(mapStateToProps)(Loading);
