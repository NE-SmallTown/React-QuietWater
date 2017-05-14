/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/10
 */
import React, { PropTypes } from 'react';

import VisibleRender from '../VisibleRender';

import isBoolean from 'lodash/isBoolean';

const defaultOptions = {
  // 预检查函数,在调用点击处理函数之前会调用此函数进行检查（一般为检查是否登录,当然也可以为其他的,比如是否来自某一特定浏览器
  // 某一特定IP等等）,所以这里没有写成loginVertifyFunc,而是写成更一般的preVertifyFunc
  preVertifyFunc: () => {
    console.log('before call Auth component\'s render,preVertify something....');
  },
  onVertifyFail: () => {
    console.warn(`vertify fail!Probably you want to provide some message or redirect to the user.`);
  }
};

// 目前来说,只考虑点击,其他的至于hover,focus,缩放,或者其他形式的实在是不太可能用到
const pemHandlerEventType = ['onClick'];

/**
 * 目前设计的权限机制是静态的,即是预先知道什么角色拥有什么权限,实际上存在动态权限,运营可以随时改变某类角色拥有的权限
 * 传统做法是去fetch各类角色拥有的权限,然后在前端动态设置,而不是写死,但是本系统没有那么复杂,所以没有那么设计
 *
 * 权限可划分为以下2类:
 *
 * 1. 视觉类（即到底要不要渲染传进来的children），对应的type类型为"see"
 *
 * 2. 交互类（即到底允许不允许对传进来的children进行某种事件交互，如点击），对应的type类型为"event"
 *
 * */
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
      type: defaultType || 'see'
    }

    render () {
      const { children, type, needPreVertify, preVertifyFunc, vertifyFunc = defaultVertifyFunc, onVertifyFail } = this.props;

      const childrenLength = React.Children.count(children);
      if (childrenLength >= 2) {
        console.warn(`Auth Component's children.length must be 1,but passed in ${childrenLength}`);

        return null;
      }

      if (
        type === 'see' && (needPreVertify === true ||
        typeof options.preVertifyFunc !== 'undefined' ||
        typeof options.onVertifyFail !== 'undefined')
      ) {
        console.warn(`you set the type to 'see',but when the type is 'see',we won't call preVertifyFunc.
        and onVertifyFail,please change type to 'event' or don't set the preVertifyFunc and onVertifyFail`);
      }

      if (needPreVertify === true && typeof options.preVertifyFunc === 'undefined') {
        console.warn(`you set the needPreVertify flag to true but don't pass the preVertifyFunc field,
        we would use the default preVertifyFunc,but this probably is not your's intention.`);
      }

      if (needPreVertify === false && typeof options.preVertifyFunc !== 'undefined') {
        console.warn(`you set the needPreVertify flag to true but pass a preVertifyFunc,the preVertifyFunc
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
                const isPreVertifyOk = preVertifyFunc();

                if (!isBoolean(isPreVertifyOk)) {
                  console.warn(`your preVertifyFunc need return a boolean value but now return ${isPreVertifyOk}`);
                } else {
                  if (isPreVertifyOk) {
                    const isVertifyOk = vertifyFunc();

                    if (!isBoolean(isVertifyOk)) {
                      console.warn(`your vertifyFunc need return a boolean value but now return ${isVertifyOk}`);
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
