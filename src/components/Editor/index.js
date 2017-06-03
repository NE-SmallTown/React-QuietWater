/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/18 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';

import RichTextEditor from 'react-rte';

import globalConfig from '../../globalConfig';

import './index.css';

// TODO 编辑器要能全屏
// TODO 找个更合适的编辑器
// https://github.com/leejaen/react-lz-editor
// https://github.com/jpuri/react-draft-wysiwyg
// https://github.com/zenoamaro/react-quill
export default class Editor extends React.PureComponent {
  static propTypes = {
    onContentChange: PropTypes.func,
    onSubmit: PropTypes.func,
    className: PropTypes.string
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      editorContentObj: RichTextEditor.createEmptyValue()
    };

    this.toolbarConfig = {
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' }
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' }
      ]
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
    const { className } = this.props;

    const { placeholderText } = this.context.quietWaterLanguage.QuietWater.Error.replyEditor;
    const { submitText } = this.context.quietWaterLanguage.Editor.commentEditor;

    return (
      <div styleName="wrap" className={className}>
        <RichTextEditor
          style={globalConfig.styles.replyEditor}
          toolbarConfig={{ display: this.toolbarConfig }}
          value={this.state.editorContentObj}
          onChange={this.handleEditorChange}
          placeholder={placeholderText}
        />

        <div styleName="submitBtn-wrap">
          <button styleName="submitBtn" onClick={this.handleSubmit}>{submitText}</button>
        </div>
      </div>
    );
  }
};
