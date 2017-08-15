/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/1 by Heaven
 */

import React from 'react';
import Select, { Option } from 'rc-select';

import QuietWater, { LanguageProvider, globalConfig } from 'react-quietwater';

import './globalStyles/global.scss';

let languageObj = require(`react-quietwater/lib/language/${globalConfig.languageName}`).default;

export default class App extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      languageName: languageObj.languageName,
      languageObj
    };

    this.allLanguageNameArray = ['zh-cn', 'en-us'];
  }

  handleLanguageOnChange = e => {
    let languageIndex;
    if (e && e.target) {
      languageIndex = e.target.value;
    } else {
      languageIndex = e;
    }

    const languageName = this.allLanguageNameArray[languageIndex];

    const languageObj = require(`react-quietwater/lib/language/${languageName}`).default;

    this.setState({
      languageName,
      languageObj
    });
  }

  render () {
    // TODO 写添加回复和评论的接口
    // TODO 下面改成一个文章页面
    // TODO <Link>的to可以设置hash参数
    const { languageName, languageObj } = this.state;

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

        <div style={{ marginLeft: '30px' }}>
          <h2>Language Select</h2>

          <Select
            value={languageName}
            placeholder="select your language"
            dropdownMenuStyle={{ maxHeight: 200, overflow: 'auto' }}
            style={{ width: 180 }}
            optionLabelProp="children"
            onChange={this.handleLanguageOnChange}
          >
            {/* eslint-disable*/}
            { this.allLanguageNameArray.map((lName, index) =>
              <Option key={index} text={lName} >{lName}</Option>) }
            {/* eslint-enable*/}
          </Select>
        </div>

        <div style={{ width: '800px', margin: '0 auto' }}>
          <LanguageProvider key={languageName} language={languageObj}>
            <QuietWater hostId="110000199803245551" quietWaterWidth={800} />
          </LanguageProvider>
        </div>
      </div>
    );
  }
};
