/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */

import React from 'react';

import QuietWater, { LanguageProvider } from 'react-quietwater';

import zh_cn from 'react-quietwater/lib/language/zh-cn';

export default class App extends React.PureComponent {
  render () {
    return (
      <div>
        <div style={{ marginBottom: '200px' }}>
          这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />
          这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />
          这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />
          这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />
          这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />
          这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容这是用户自己网站的内容
          <br />
        </div>

        <div style={{ width: '800px', margin: '0 auto' }}>
          <LanguageProvider language={zh_cn}>
            <QuietWater hostId="110000199803245551" quietWaterWidth={800} />
          </LanguageProvider>
        </div>
      </div>
    );
  }
};
