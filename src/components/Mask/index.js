/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/3/18 by Heaven
 */
import React, { PropTypes } from 'react';
import Animate from 'rc-animate';

import LazyRenderBox from '../Modal/LazyRenderBox';

import maskStyles from './maskStyles.css';

function getMaskTransitionName (props) {
  let transitionName = props.maskTransitionName;
  const animation = props.maskAnimation;
  if (!transitionName && animation) {
    transitionName = `${props.prefixCls}-${animation}`;
  }
  return transitionName;
}

function getMaskStyle ({ zIndex, maskStyle } = {}) {
  const ret = {};
  if (typeof zIndex !== 'undefined') {
    ret.zIndex = zIndex;
  }

  return { ...ret, ...maskStyle };
}

function Mask (props) {
  let maskElement;
  const maskTransition = getMaskTransitionName(props);

  maskElement = (
    <LazyRenderBox
      style={getMaskStyle(props)}
      styleName={`${props.prefixCls}-mask`}
      hiddenClassName={`${props.prefixCls}-mask-hidden`}
      visible={props.visible}
      {...props.maskProps}
    />
  );

  if (maskTransition) {
    maskElement = (
      <Animate
        showProp="visible"
        transitionAppear
        component=""
        transitionName={maskTransition}
      >
        {maskElement}
      </Animate>
    );
  }

  return maskElement;
}

Mask.propTypes = {
  maskProps: PropTypes.object,
  visible: PropTypes.bool,
  prefixCls: PropTypes.string,
  maskStyle: PropTypes.object,
  zIndex: PropTypes.number
};

export default Mask;
