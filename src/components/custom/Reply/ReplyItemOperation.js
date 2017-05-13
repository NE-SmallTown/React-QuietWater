/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../../SvgIcon';

import './ReplyItemOperation.css';

export default class ReplyItemOperation extends React.PureComponent {
  static propTypes = {
    replyId: PropTypes.string,
    commentCount: PropTypes.number,
    praiseCount: PropTypes.number,
    isContentExpanded: PropTypes.bool,
    isContentTooLong: PropTypes.bool,
    onClickReadAll: PropTypes.func,
    onClickFold: PropTypes.func,
    className: PropTypes.string
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  handleClickPraiseBtn = () => {
    console.log('点赞');
  }

  handleClickThumbsdownBtn = () => {
    console.log('踩');
  }

  handleClickCommentBtn = () => {
    console.log('展开评论');
  }

  handleClickShareBtn = () => {
    console.log('展开分享列表');
  }

  handleClickExpand = () => {
    console.log('显示此回复的全部内容');

    this.props.onClickReadAll && this.props.onClickReadAll();
  }

  handleClickFold = () => {
    console.log('折叠此回复');

    this.props.onClickFold && this.props.onClickFold();
  }

  render () {
    const { replyId, commentCount, praiseCount, isContentExpanded, className, isContentTooLong } = this.props;
    const { shareText, commentBtnPostfix, expandText, foldText } = this.context.quietWaterLanguage.Reply;

    // TODO 只能点赞一次
    return (
      <div styleName="wrap" className={`clearfix ${className}`}>
        <button styleName="btn-praise" onClick={this.handleClickPraiseBtn}>
          <SvgIcon iconName="icon-praise" styleName="icon-praise" />

          {praiseCount}
        </button>

        <button styleName="btn-thumbsdown" onClick={this.handleClickThumbsdownBtn}>
          <SvgIcon iconName="icon-thumbsdown" styleName="icon-thumbsdown" />
        </button>

        <button styleName="btn-comment" onClick={this.handleClickCommentBtn}>
          <SvgIcon iconName="icon-comment" styleName="icon-comment" />

          {`${commentCount}${commentBtnPostfix}`}
        </button>

        <button styleName="btn-share" onClick={this.handleClickShareBtn}>
          <SvgIcon iconName="icon-share" styleName="icon-share" />

          {shareText}
        </button>

        { isContentTooLong
          ? isContentExpanded
            ? <button styleName="btn-fold" onClick={this.handleClickFold}>
                {foldText}

                <SvgIcon iconName="icon-fold" styleName="icon-fold" />
              </button>
            : <button styleName="btn-expand" onClick={this.handleClickExpand}>
                {expandText}

                <SvgIcon iconName="icon-expand" styleName="icon-expand" />
              </button>
          : null
        }
      </div>
    );
  }
};

