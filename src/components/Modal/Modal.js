/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/3/18 by Heaven
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import createFragment from 'react-addons-create-fragment';

import Mask from '../Mask';
import LazyRenderBox from './LazyRenderBox';
import SvgIcon from '../SvgIcon';
import { getTransitionName, offsetOfNode, setTransformOrigin } from './util';
import getScrollBarSize from '../../utils/getScrollBarSize';
import pick from 'lodash/pick';

import './Modal.css';

let openCount = 0;

export default class Modal extends React.PureComponent {
  static propTypes = {
    wrapClassName: PropTypes.string,
    showMask: PropTypes.bool,
    prefixCls: PropTypes.string,
    visible: PropTypes.bool,
    hasXIcon: PropTypes.bool,
    clickMaskWillCloseModal: PropTypes.bool,
    onClose: PropTypes.func,
    dialogContentElement: PropTypes.element,
    mousePosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    afterClose: PropTypes.func,
    maskStyle: PropTypes.object,
    wrapStyle: PropTypes.object
  }

  static defaultProps = {
    showMask: true,
    visible: false,
    prefixCls: 'ant-modal',
    clickMaskWillCloseModal: true,
    hasXIcon: true
  }

  addScrollingEffect = () => {
    openCount++;
    if (openCount !== 1) {
      return;
    }
    this.checkScrollbar();
    this.setScrollbar();
    document.body.style.overflow = 'hidden';
  }

  setScrollbar = () => {
    if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  }

  checkScrollbar = () => {
    let fullWindowWidth = window.innerWidth;
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;

    if (this.bodyIsOverflowing) {
      this.scrollbarWidth = getScrollBarSize();
    }
  }

  componentWillMount () {
    this.inTransition = false;
  }

  componentDidMount () {
    this.componentDidUpdate({});
  }

  componentWillUnmount () {
    if (this.props.visible || this.inTransition) {
      this.removeScrollingEffect();
    }
  }

  removeScrollingEffect = () => {
    openCount--;
    if (openCount !== 0) {
      return;
    }
    document.body.style.overflow = '';
    this.resetScrollbar();
  }

  resetScrollbar () {
    document.body.style.paddingRight = '';
  }

  adjustDialog = () => {
    if (this.wrap && this.scrollbarWidth !== undefined) {
      const modalIsOverflowing =
        this.wrap.scrollHeight > document.documentElement.clientHeight;
      this.wrap.style.paddingLeft =
        `${!this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : ''}px`;
      this.wrap.style.paddingRight =
        `${this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''}px`;
    }
  }

  resetAdjustments = () => {
    if (this.wrap) {
      this.wrap.style.paddingLeft = '';
      this.wrap.style.paddingLeft = '';
    }
  }

  onAnimateLeave = () => {
    if (this.wrap) {
      this.wrap.style.display = 'none';
    }

    this.inTransition = false;
    this.removeScrollingEffect();
    this.props.afterClose && this.props.afterClose();
  }

  componentDidUpdate (prevProps) {
    const props = this.props;

    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.openTime = Date.now();
        this.lastOutSideFocusNode = document.activeElement;

        this.addScrollingEffect();
        this.wrap.focus();

        // eslint-disable-next-line
        const dialogNode = ReactDOM.findDOMNode(this.dialog);
        const mousePosition = props.mousePosition;

        if (mousePosition) {
          const elOffset = offsetOfNode(dialogNode);
          setTransformOrigin(dialogNode,
            `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
        } else {
          setTransformOrigin(dialogNode, '');
        }
      }
    } else if (prevProps.visible) {
      this.inTransition = true;

      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }

        this.lastOutSideFocusNode = null;
      }
    }
  }

  getDialogElement = () => {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const dest = {};

    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }

    const style = { ...props.style, ...dest };

    const dialogElement = (
      <LazyRenderBox
        ref={ele => { this.dialog = ele; }}
        style={style}
        styleName={prefixCls}
        className={props.className}
        visible={props.visible}
      >
        {this.getDialogContentElement()}
      </LazyRenderBox>
    );

    const transitionName = getTransitionName(props);
    return (
      <Animate
        showProp="visible"
        onLeave={this.onAnimateLeave}
        transitionName={transitionName}
        component=""
        transitionAppear
      >
        {dialogElement}
      </Animate>
    );
  }

  getDialogContentElement = () => {
    const props = this.props;
    const prefixCls = props.prefixCls;

    let dialogContentElement = props.dialogContentElement;
    if (!dialogContentElement) {
      let footer;
      if (props.footer) {
        footer = (
          <div styleName={`${prefixCls}-footer`}>
            {props.footer}
          </div>
        );
      }

      let header;
      if (props.title) {
        header = (
          <div styleName={`${prefixCls}-header`}>
            <div styleName={`${prefixCls}-title`}>
              {props.title}
            </div>
          </div>
        );
      }

      /*
      // 如果是调用者来提供dialogElement的部分，那么因为diglogContentElement具体是什么我们是不知道的，所以不能采用像
      // React.cloneElement(props.dialogContentElement, { triggerModalClose: this.onClose })这样的方式。因为
      // 这里的triggerModalClose这样的命名，对于dialogContentElement来讲它根本不知道也不应该知道自己是和modal有关系的
      // 所以，如果像这样命名，在dialogContentElement内部调用this.props.triggerModalClose()就会显得很奇怪
      // 所以这里采用onFinish这样的命名，感觉稍微好一点。暂时没有想到解决像这样的不可知论前提下的组件通信问题好的办法。
      */
      dialogContentElement = createFragment({
        dialogHeader: header,
        dialogBody: <div styleName={`${prefixCls}-body`}>
          {props.children}
        </div>,
        dialogFooter: footer
      });
    }

    let closer;
    if (props.hasXIcon) {
      closer = (
        <button onClick={this.onClose} styleName={`${prefixCls}-close`}>
          <SvgIcon iconName="icon-close-x" />
        </button>
      );
    }

    return (
      <div styleName={`${prefixCls}-content`}>
        {closer}

        {dialogContentElement}
      </div>
    );
  }

  onMaskClick = (e) => {
    // android trigger click on open (fastclick??)
    /* if (Date.now() - this.openTime < 300) {
      return;
    } */
    if (e.target === e.currentTarget) {
      this.onClose(e);
    }
  }

  getZIndexStyle = () => {
    const style = {};
    const props = this.props;

    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
    }

    return style;
  }

  getWrapStyle = () => {
    return { ...this.getZIndexStyle(), ...this.props.wrapStyle };
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  }

  render () {
    const { prefixCls, clickMaskWillCloseModal, showMask, wrapClassName } = this.props;
    const style = this.getWrapStyle();
    // clear hide display
    // and only set display after async anim, not here for hide
    if (this.props.visible) {
      style.display = null;
    }

    return (
      <div>
        {showMask &&
        <Mask
          {...pick(this.props,
            ['maskProps',
              'maskTransitionName',
              'maskAnimation',
              'visible',
              'prefixCls',
              'maskStyle',
              'zIndex'
            ])}
        />}

        <div
          styleName={`${prefixCls}-wrap`}
          className={wrapClassName}
          ref={(ele) => { this.wrap = ele; }}
          onClick={clickMaskWillCloseModal && this.onMaskClick}
          style={style}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}
