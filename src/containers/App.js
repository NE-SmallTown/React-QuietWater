/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1
 */
import React from 'react';

import LanguageProvider from '../components/Provider/LanguageProvider';
import QuietWater from './QuietWater';

import zh_cn from '../language/zh-cn';

export default class App extends React.PureComponent {
  render () {
    // TODO 很多地方都需要加上alt属性
    // TODO 在readme写上提示,如果要做成响应式的,只需要将quietWaterWidth改变就行了,或者通过Grid组件包裹QuietWater然后设置quietWaterWidth为外层的节点的syle.width

    return (
      <div style={{ width: '800px', margin: '0 auto' }}>
        <LanguageProvider language={zh_cn}>
          <QuietWater hostId="110000199803245551" quietWaterWidth={800} />
        </LanguageProvider>
      </div>
    );
  }
};
