/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import classNames from 'classnames';

import { SparkScroll } from '../../ReactSparkScroll';
import ReplyItemHeader from './ReplyItemHeader';
import ReplyItemContent from './ReplyItemContent';
import ReplyItemOperation from './ReplyItemOperation';

import { isContentTooLongUtil } from '../../../utils/reply';

import './ReplyItem.css';

export default class ReplyItem extends React.PureComponent {
  static propTypes = {
    author: PropTypes.object,
    commentCount: PropTypes.number,
    content: PropTypes.string,
    createdTime: PropTypes.string,
    // 摘要暂时可能用不上,以后可能用到,比如知乎首页显示的就是摘要信息
    excerpt: PropTypes.string,
    id: PropTypes.string,
    lastUpdatedTime: PropTypes.string,
    praiseCount: PropTypes.number,
    replyWrapElementWidth: PropTypes.number
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  constructor (props, context) {
    super(props, context);

    const isContentTooLong = isContentTooLongUtil(props.content, props.replyWrapElementWidth, this.context.quietWaterLanguage.languageName);

    this.state = {
      // we can also make ReplyItemContent show first and get its height,if that,we don't need calculate by
      // the `isContentTooLong` util function ,but that's not friendly to users.
      isContentTooLong,
      // contentCount: props.content.length,
      isContentExpanded: !isContentTooLong,
      isContentEnterViewport: false
    };
  }

  handleClickReadAll = () => {
    this.setState({
      isContentExpanded: false
    });
  }

  handleClickFold = () => {
    this.setState({
      isContentExpanded: true
    });
  }

  // 对于内容较多的item（即需要折叠的）,当用户滚动使这个item进入视窗的时候,将与之对应的操作栏设置为fixed
  // for the item which has much content,when it enter the viewport by scrolling of users,
  // we should set the corresponding operation bar's style to fixed
  handleScrollIntoLongContetnItem = (e) => {
    console.log('滚动到内容了');
    this.setState({
      isContentEnterViewport: true
    });
  }

  handleScrollIntoLongContetnItemEnd = (e) => {
    console.log('滚动到内容底部了');
    this.setState({
      isContentEnterViewport: false
    });
  }

  render () {
    const {
      id: replyId,
      author,
      commentCount,
      createdTime,
      lastUpdatedTime,
      praiseCount,
      excerpt: _excerpt,
      content: _content
    } = this.props;

    const { isContentTooLong, isContentExpanded, isContentEnterViewport } = this.state;

    // 很多html文本,如回复和评论都是由后端发过来的,因为所以要进行xss过滤,因为要用dangerouslySetInnerHTML
    // sanitize all the potential xss text
    const [excerpt, content] = [_excerpt, _content].map(maybeDirtyHtml => DOMPurify.sanitize(maybeDirtyHtml));

    const commonReplyItemContentProps = {
      content,
      excerpt,
      lastUpdatedTime,
      isContentTooLong
    };

    // 判定条件见下方的注释
    // please see below comment if you want to know why judge by this conditions
    const operationBarClassName = classNames({
      'fixed-operationBar': isContentTooLong && isContentExpanded && isContentEnterViewport
    });

    /* eslint-disable */
    return (
      <div styleName="wrap" id={`qw_${replyId}`}>
        <ReplyItemHeader {...author} replyCreatedTime={createdTime} />
          {/* 内容比较多,且目前内容处于展开状态的（即内容全部被显示）的才需要绑定滚动事件检测,看是否需要将操作栏fixed,对于内容较少的则不绑定事件,避免浪费性能
          just when item which has long content and window displays all of them now, we bind scroll event to
          fixed operation bar,if no many contents don't bind to improve perf */}
        {
          isContentTooLong && isContentExpanded
          ? <SparkScroll.div
              key="ric1"
              timeline={{
                'topTop': { onDown: this.handleScrollIntoLongContetnItem },
                'bottomBottom': { onDown: this.handleScrollIntoLongContetnItemEnd}
              }}
            >
              <ReplyItemContent
                {...commonReplyItemContentProps}
              />
            </SparkScroll.div>
          : <ReplyItemContent key="ric2" {...commonReplyItemContentProps} />
        }

          <ReplyItemOperation
            key="rio"
            excerpt={excerpt}
            styleName={operationBarClassName}
            replyId={replyId}
            commentCount={commentCount}
            praiseCount={praiseCount}
            isContentTooLong={isContentTooLong}
            isContentExpanded={isContentExpanded}
            onClickReadAll={this.handleClickReadAll}
            onClickFold={this.handleClickFold}
          />
        </div>
    );
    /* eslint-disable */
  }
};
