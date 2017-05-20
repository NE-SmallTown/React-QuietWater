/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/18 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';

import { UserAvatarPopover, UserLink } from '../User';
import Modal from '../../Modal';
import CommentItemOperation from './CommentItemOperation';
import ConversationBox from './ConversationBox';

import { getConversationList } from '../../../selectors';
import { loadConversation } from '../../../actions';

import './CommentItem.css';

class CommentItem extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    author: PropTypes.object,
    content: PropTypes.string,
    createdTime: PropTypes.string,
    isAuthor: PropTypes.bool,
    replyTo: PropTypes.object,
    loadConversation: PropTypes.func,
    conversationList: PropTypes.array
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  handleClickReply = () => {
    console.log('准备回复');
  }

  handleShowConversation = () => {
    console.log('准备用modal显示这两个人之间的对话');

    // 后台拿到commentId,然后去找这个commentId下的replyTo字段就可以得到是回复给谁的,然后在两个人的所有评论中
    // 找出replyTo是对方的评论,最后按**时间顺序**返回找到的这些评论,注意返回的结果集中的第一条肯定是没有replyTo字段的
    this.props.loadConversation({
      commentId: this.props.id
    });
  }

  render () {
    const { id: commentId, author, content, createdTime, isAuthor, replyTo, conversationList } = this.props;

    const { replyToText, isAuthorText } = this.context.quietWaterLanguage.Comment.headerTitle;

    // TODO 可以删除评论
    // TODO 限制content的大小,根据换行符和字数,或者根据高度进行限制
    // TODO 当滚动在内容区域时,采用modal来显示评论,而不是展开评论,因为这样不利于阅读
    // TODO 知乎目前的查看对话模式是,点击之后会显示所有的对话记录,虽然这样有利于了解上下文,但是后面看看需不需要只显示回复的那条以及那条之后评论
    // TODO 而且目前点击查看对话是从服务端获取数据,之后看看是否提供一个配置项,让从store里直接获取,因为有的网站并不要求这么高的实时性
    return (
      <div styleName="wrap">
        <div styleName="header">
          <UserAvatarPopover {...author} />

          <UserLink styleName="userName" {...author}>{author.userName}</UserLink>

          {isAuthor && <span styleName="isAuthorText" key="iat">{`( ${isAuthorText} )`}</span>}

          {replyTo &&
            [
              <span key="rtt" styleName="replyToText">{replyToText}</span>,

              <UserLink key="rt" styleName="userNameOfReplyTo" {...replyTo}>{replyTo.userName}</UserLink>
            ]
          }

          <span key="ct" styleName="createdTime">{createdTime}</span>
        </div>

        <div styleName="content" dangerouslySetInnerHTML={{ __html:  DOMPurify.sanitize(content) }} />

        把下面的提取出来，在ConversationBox里引入CommentItem造成循环引用了
        <CommentItemOperation
          replyTo={replyTo}
          onClickReply={this.handleClickReply}
          onShowConversation={this.handleShowConversation}
        />

        { conversationList.length > 0 &&
          <Modal key="clm" dialogContentElement={<ConversationBox conversationList={conversationList} />} />
        }
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  conversationList: getConversationList(ownProps.reply, ownProps.author.userId, ownProps.replyTo.userId)(state)
});

export default connect(mapStateToProps, { loadConversation })(CommentItem);
