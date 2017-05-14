/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/3/18
 */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';

let modalContainers = {};
let modalGuid = 0;

export default class ModalWrap extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func
  }

  static defaultProps = {
    visible: false,
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade'
  }

  constructor (props) {
    super(props);

    this.modalContainerId = modalGuid++;

    this.state = {
      visible: props.visible
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.visible !== this.state.visible;
  }

  componentDidUpdate () {
    this._renderOrUpdateModalInContainer();
  }

  componentWillUnmount () {
    const container = modalContainers[this.modalContainerId];

    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }

  componentDidMount () {
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);

    modalContainers[this.modalContainerId] = modalContainer;

    this._renderOrUpdateModalInContainer();
  }

  _renderOrUpdateModalInContainer () {
    ReactDOM.render(
      <Modal onClose={this.handleCancel} {...this.props} visible={this.state.visible} />,
      this._getModalContainer()
    );
  }

  _getModalContainer = () => modalContainers[this.modalContainerId]

  handleCancel = (e) => {
    this.setState({ visible: false });

    const onCancel = this.props.onCancel;

    if (onCancel) {
      onCancel(e);
    }
  }

  // 后面在看看需不需要加
/*  const defaultFooter = [(
    <Button
      key="cancel"
      size="large"
      onClick={this.handleCancel}
    >
      {cancelText || '取消'}
    </Button>
  ), (
    <Button
      key="confirm"
      type="primary"
      size="large"
      loading={confirmLoading}
      onClick={this.handleOk}
    >
      {okText || '确定'}
    </Button>
  )]; */

  handleOk = (e) => {
    const onOk = this.props.onOk;

    // onOk的第二个参数是为了确定按钮有时候需要延长或者说异步关闭，如表单验证成功后发送ajax，成功后才允许关闭
    // 所以调用者在ajax的success中调用onOk的第二个参数，来达到实现关闭modal的效果，后面看看需不需要改成promise
    if (onOk) {
      onOk(e, () => {
        this.setState({ visible: false });
      });
    } else {
      this.setState({ visible: false });
    }
  }

  render () {
    return null;
  }
}