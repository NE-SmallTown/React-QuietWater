/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/9
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './index.css';

class Loading extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    actionTypeOfStartFetching: PropTypes.string.isRequired,
    actionTypeOfFinishFetching: PropTypes.string.isRequired,
    startFetching: PropTypes.bool,
    finishFetching: PropTypes.bool
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

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.startFetching === this.state.startFetching && nextState.finishFetching === this.state.finishFetching) {
      return false;
    }

    return true;
  }

  handleStartFetching = () => {
    this.setState({ startFetching: true });
  }

  handleFinishFetching = () => {
    this.setState({ finishFetching: true });
  }

  render () {
    const { children } = this.props;
    const { startFetching, finishFetching } = this.state;

    // 因为有的组件并不是采用redux进行fetch，所以针对这种组件这里传过去两个回调
    return (
      startFetching
      ? finishFetching
        ? React.cloneElement(
          children,
          {
            onStartFetching: this.handleStartFetching,
            onFinishFetching: this.handleFinishFetching
          }
        )
        : <div>lodaing....</div>
      : null
    );
  }
}

const mapStateToProps = (state, { actionTypeOfStartFetching, actionTypeOfFinishFetching }) => {
  const { globalSettings: curDispatchingActionType } = state;
  const ret = {};

  if (curDispatchingActionType === actionTypeOfStartFetching) {
    ret.startFetching = true;
  }

  if (curDispatchingActionType === actionTypeOfStartFetching) {
    ret.finishFetching = true;
  }

  return ret;
};

export default connect(mapStateToProps)(Loading);
