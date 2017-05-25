/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/23 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import RichTextEditor from 'react-rte'; // https://github.com/sstur/react-rte

import './index.css';

// TODO 自己写一个或者寻求社区换一个Editor
export default class MiniEditor extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    widthSubmitBtn: PropTypes.bool,
    onContentChange: PropTypes.func,
    placeholder: PropTypes.string,
    context: PropTypes.object
  }

  static defaultProps = {
    widthSubmitBtn: true
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  constructor (props) {
    super(props);

    if (!props.widthSubmitBtn && props.onSubmit) {
      warning(false, `you set the widthSubmitBtn to false,but you provide the onSubmit prop,if you want to
      provide the onSubmit prop,you need to set the widthSubmitBtn to true.`);
    }

    this.state = {
      editorContentObj: RichTextEditor.createEmptyValue()
    };
  }

  handleEditorChange = valueObj => {
    this.setState({ editorContentObj: valueObj });

    // 因为如果在这里就进行.toString('html')太消耗时间了(每次change都要转换一次),而且没有必要,所以我们
    // 把整个对象传过去,什么时候转为html由调用者决定
    this.props.onContentChange && this.props.onContentChange(valueObj);
  }

  handleSubmit = e => {
    this.props.onSubmit && this.props.onSubmit(this.state.editorContentObj.toString('html'), e);
  }

  render () {
    const { className, widthSubmitBtn, placeholder } = this.props;

    const context = this.context.quietWaterLanguage ? this.context : this.props.context;
    const { submitText } = context.quietWaterLanguage.Editor.commentEditor;

    return (
      <div styleName="wrap" className={`${className} clearfix`}>
        <RichTextEditor
          toolbarConfig={{ display: [] }}
          value={this.state.editorContentObj}
          onChange={this.handleEditorChange}
          placeholder={placeholder}
        />

        { widthSubmitBtn &&
          <button styleName="submitBtn" onClick={this.handleSubmit}>{submitText}</button>
        }
      </div>
    );
  }
};
