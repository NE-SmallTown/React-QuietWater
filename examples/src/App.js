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
    // TODO 写添加回复和评论的接口
    // TODO 下面改成一个文章页面
    // TODO <Link>的to可以设置hash参数
    return (
      <div>
        <div style={{ marginBottom: '100px', fontSize: '16px' }}>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
          <p>this is my website content </p>
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
