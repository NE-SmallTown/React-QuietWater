/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */

import React from 'react';

import LanguageProvider from '../../src/components/Provider/LanguageProvider';
import QuietWater from '../src';

import zh_cn from '../../src/language/zh-cn';

export default class App extends React.PureComponent {
  render () {
    return (
      <div style={{ width: '800px', margin: '0 auto' }}>
        <LanguageProvider language={zh_cn}>
          <QuietWater hostId="110000199803245551" quietWaterWidth={800} />
        </LanguageProvider>
      </div>
    );
  }
};
