/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
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

    return (
      <div style={{ width: '800px', margin: '0 auto' }}>
        <LanguageProvider language={zh_cn}>
          <QuietWater hostId="110000199803245551" quietWaterWidth={800} />
        </LanguageProvider>
      </div>
    );
  }
};