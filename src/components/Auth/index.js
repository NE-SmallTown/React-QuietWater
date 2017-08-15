/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/10 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import VisibleRender from '../VisibleRender';

import isBoolean from 'lodash/isBoolean';

const defaultOptions = {
  // 预检查函数,在调用点击处理函数之前会调用此函数进行检查（一般为检查是否登录,当然也可以为其他的,比如是否来自某一特定浏览器
  // 某一特定IP等等）,所以这里没有写成loginVertifyFunc,而是写成更一般的preVertifyFunc
  preVertifyFunc: () => {
    warning(false, 'before call Auth component\'s render,preVertify something....');
  },
  onVertifyFail: () => {
    warning(false, `this is the default VertifyFail function!Probably you want to provide some message or redirect to user by yourself.`);
  }
};

// 目前来说,只考虑点击,其他的至于hover,focus,缩放,或者其他形式的实在是不太可能用到
const pemHandlerEventType = ['onClick'];

export default (options) => {
  const mergedOption = { ...defaultOptions, ...options };

  const {
    needPreVertify: defaultNeedPreVertify,
    preVertifyFunc: defaultPreVertifyFunc,
    type: defaultType,
    onVertifyFail: defaultOnVertifyFail,
    vertifyFunc: defaultVertifyFunc
  } = mergedOption;

  return class Auth extends React.PureComponent {
    static propTypes = {
      children: PropTypes.node,
      type: PropTypes.oneOf(['see', 'event']).isRequired,
      needPreVertify: PropTypes.bool,
      preVertifyFunc: PropTypes.func,
      vertifyFunc: PropTypes.func,
      onVertifyFail: PropTypes.func // 注意这是针对vertifyFunc而不是preVertifyFunc的,preVertifyFunc的失败处理交给用户自己处理，即写在preVertifyFunc里面
    }

    static defaultProps = {
      preVertifyFunc: defaultPreVertifyFunc,
      onVertifyFail: defaultOnVertifyFail,
      needPreVertify: defaultNeedPreVertify || false,
      vertifyFunc: defaultVertifyFunc,
      type: defaultType || 'see'
    }

    render () {
      const { children, type, needPreVertify, preVertifyFunc, vertifyFunc, onVertifyFail } = this.props;

      const childrenLength = React.Children.count(children);
      if (childrenLength >= 2) {
        warning(false, `Auth Component's children.length must be 1,but passed in ${childrenLength}`);

        return null;
      }

      if (
        type === 'see' && (needPreVertify === true ||
        typeof options.preVertifyFunc !== 'undefined' ||
        typeof options.onVertifyFail !== 'undefined')
      ) {
        warning(false, `you set the type to 'see',but when the type is 'see',we won't call preVertifyFunc.
        and onVertifyFail,please change type to 'event' or don't set the preVertifyFunc and onVertifyFail`);
      }

      if (needPreVertify === true && typeof options.preVertifyFunc === 'undefined') {
        warning(false, `you set the needPreVertify flag to true but don't pass the preVertifyFunc field,
        we would use the default preVertifyFunc,but this probably is not your intention.`);
      }

      if (needPreVertify === false && typeof options.preVertifyFunc !== 'undefined') {
        warning(false, `you set the needPreVertify flag to false but pass a preVertifyFunc,the preVertifyFunc
        would not be called,please set the flag to true or don't pass the preVertifyFunc.`);
      }

      if (type === 'see') {
        return (
          <VisibleRender isVisible={vertifyFunc} switchBySetNull>
            {children}
          </VisibleRender>
        );
      } else if (type === 'event') {
        return React.cloneElement(
          children,
          {
            ...pemHandlerEventType.reduce((ret, eventType) => {
              ret[eventType] = (e) => {
                let isPreVertifyOk = true;
                if (needPreVertify) {
                  isPreVertifyOk = preVertifyFunc();
                }

                if (!isBoolean(isPreVertifyOk)) {
                  warning(false, `your preVertifyFunc need return a boolean value but now return ${isPreVertifyOk}`);
                } else {
                  if (isPreVertifyOk) {
                    const isVertifyOk = vertifyFunc();

                    if (!isBoolean(isVertifyOk)) {
                      warning(false, `your vertifyFunc need return a boolean value but now return ${isVertifyOk}`);
                    } else {
                      const originEventHandler = children.props[eventType];

                      isVertifyOk
                      ? originEventHandler && originEventHandler(e)
                      : onVertifyFail();
                    }
                  }
                }
              };

              return ret;
            }, {})
          }
        );
      }
    }
  };
};
