/**
 * v0.0.1
 *
 * 响应式图片类
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/1/7
 */
import React, { PropTypes } from 'react';
import { flow as composeLeft } from 'lodash';

import { addQuestionmark, formatUrl, INTERFACE_SEPERATOR } from '../../util/qiniuUrlParam';
import placeholder from '../../util/placeholder';
import splitObject from '../../util/splitObject';

// 在url后添加七牛接口
const appendQiniuInterfaceToUrl = (url, qiniuInterface) => {
  return addQuestionmark(url, { separator: '|' }) + qiniuInterface.interfaceName;
};

/*
* 七牛处理图片缩放的接口(imageView2)，接口格式为：
* /<mode>
* /w/<LongEdge>
* /h/<ShortEdge>
* /format/<Format>
* /interlace/<Interlace>
* /q/<Quality>
* /ignore-error/<ignoreError>
* */
const imageView2 = {
  interfaceName: 'imageView2',
  // 缩略图接口
  thumbnailInterface: option => {
    const defaultOption = {
      mode:2
    };

    return url => {
      const mergedOption = { ...defaultOption, ...option };

      const [ { }, realOption ] = splitObject(mergedOption, [ 'mode' ]);

      return formatUrl(url + INTERFACE_SEPERATOR + mergedOption.mode, realOption); // 默认采用模式2
    };
  },
  // 渐进显示接口
  interlaceInterface: option => url => formatUrl(url, { interlace:1, ...option }) // 默认支持渐进显示
};

/**
 * 返回图片地址被处理后的地址，目前默认就采用imageView2了，以后再来添加自定义功能
 * @param src {string} 图片未处理前的地址，如cdn.site.com/1.jpg
 * @param width {number} 图片应该占有的宽度
 * @param height {number} 图片应该占有的高度
 */
const handleOriginalImgUrl = function (src, width, height) {
  if (arguments.length !== 3) {
    console.warn(`arguments.length must be 3 but passed in ${arguments.length}, and the order must be [src, width, height]`);
  }

  return composeLeft(imageView2.thumbnailInterface({ w: width, h: height }), imageView2.interlaceInterface())
        (appendQiniuInterfaceToUrl(src, imageView2));
};

class QiniuImage extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    placeholderWidth: PropTypes.number,
    placeholderHeight: PropTypes.number,
    componentOnLoad:  PropTypes.func
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.src !== nextProps.src && typeof this.props.src !== 'undefined') {
      console.warn(`The src should be undefined at the first time.But passed in ${this.props.src}.Please don't provide
      the default src,just provide undefined as the default.You must ensure the src is undefined or the real src.If the
      order is undefined -> defaultImgSrc.jpg -> realImgSrc.jpg,this maybe cause some bad situations.You should ensure
      the order is undefined -> realImgSrc.jpg`);
    }
  }

  render () {
    const { src, className, componentOnLoad, placeholderWidth, placeholderHeight } = this.props;

    // 关于如何提前获取真实图片放到文档中的宽高
    // 方案1（当前方案）：通过placeholder返回的HOC来处理
    // 方案2：将首屏的图片的宽高存在localstorge里面，后面的懒加载直接去读

    /* 关于这里为什么要对src进行判断（即不用src={handleOriginalImgUrl(src, placeholderWidth, placeholderHeight)}）
    // 如果这里不对src进行判断而允许初始时指定默认值，那么可能会导致placeholder里面的sCU返回true，那么新的src就不会生效。
    原因就是当后台的包含新的src的数据返回后，此时之前旧的src已经onload了，所以realComponentOnLoad为true了，现在
    新的src来了引起props变化，在render之前会调用sCU，但sCU返回false，所以不会再render，新的src也就不会再呈现。

    // 而src为''（即初始时调用方不指定默认的src）时不会触发load事件，所以realComponentOnLoad一直都不会为true，直到新的src来。
    // 还有一种办法就是在placeholder里面用componentWillReceiveProps来处理，具体写在那边了

    // 另外为什么这里说初始时呢，这里以歌单为例，第一次在歌单列表点击一个歌单，会导致新的src不显示，然后返回歌单列表，再点击
    // 这个歌单，新的src会显示。那是因为在歌单列表的mSTP中判断了
    // prevOpenedPlaylistId === curWillOpenPlaylistId ? getPlaylistBasicInfo(curWillOpenPlaylistId)(state) : {}，
    // 第二次点击的时候直接去state里面取值了，不会传一个空对象尽量，所以src也不会有默认值，本身就是新的src。

    // 还有，第一次点击后如果刷新，新的src也会被呈现，那是因为刷新使得fetch先于placeholder里面的setState完成。
    // 可对比[刷新](www.blog.ne-smalltown.com/notes/2017-02-20_16-42-21.jpg)
       与[不刷新](www.blog.ne-smalltown.com/notes/2017-02-20_16-41-31.jpg)的区别
    */

    return (
      <img
        src={src ? handleOriginalImgUrl(src, placeholderWidth, placeholderHeight) : ''}
        className={className}
        onLoad={componentOnLoad}
      />
    );
  }
};

export default placeholder(QiniuImage);
