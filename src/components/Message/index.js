/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/6 by Heaven
 */

import React from 'react';
import Notification from 'rc-notification';
import warning from 'warning';

import SvgIcon from '../SvgIcon';

import classNames from 'classnames';

const prefixCls = 'ant-message';
const messageTypes = ['info', 'success', 'error', 'warning', 'loading'];

let messageInstance;
let curMessageUUID = 1;

let hasConfiged = false; // 是否已经配置过了，目前的方式只允许进行一次全局配置（通常也不需要多次），如果不设置这个变量，后面再配置会覆盖之前的，显然不是我们想要的情况

let defaulStyle = {};
let defaulClassName;
let defaultDuration;
let defaulGetContainer;

const iconTypes = {
  info: 'info1',
  success: 'success1',
  error: 'error1',
  warning: 'warning1',
  loading: 'loading1'
};

function getMessageInstance (style, className) {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls,
    transitionName: 'move-up',
    style: defaulStyle,
    className: defaulClassName,
    defaulGetContainer
  });

  return messageInstance;
}

function notice (content, duration = defaultDuration, type, onClose) {
  const instance = getMessageInstance();

  instance.notice({
    key: curMessageUUID,
    duration,
    content: (
      <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
        <SvgIcon
          className={classNames({ 'anticon anticon-spin': type === 'loading' })}
          iconName={`icon-${iconTypes[type]}`}
        />
        <span>{content}</span>
      </div>
    ),
    onClose: onClose
  });

  return (function () {
    const target = curMessageUUID++;

    return function () {
      instance.removeNotice(target);
    };
  }());
}

const messageFuncs = messageTypes.reduce((messageFuncs, type) => {
  messageFuncs[type] = (content, duration, onClose) => notice(content, duration, type, onClose);

  return messageFuncs;
}, {});

export default {
  ...messageFuncs,
  config ({ style, className, duration, getContainer }) {
    if (hasConfiged) {
      return warning(false, 'you can\'t globalConfig many times.');
    }

    if (typeof style !== 'undefined') {
      defaulStyle = style;
    }

    if (typeof className !== 'undefined') {
      defaulClassName = className;
    }

    if (typeof duration !== 'undefined') {
      defaultDuration = duration;
    }

    if (typeof getContainer !== 'undefined') {
      defaulGetContainer = getContainer;
    }

    hasConfiged = true;
  },
  destroyAll () {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};
