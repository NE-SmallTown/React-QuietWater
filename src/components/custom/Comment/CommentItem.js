/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/18 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../Modal';
import { OnlyHasLoginedCanClick } from '../Auth';
import CommentItemOperation from './CommentItemOperation';
import CommentItemHeaderAndContent from './CommentItemHeaderAndContent';
import ConversationBox from './ConversationBox';
import MiniEditor from '../../MiniEditor';
import Message from '../../Message';

import globalConfig from '../../../globalConfig';
import { getConversationList } from '../../../selectors';
import { loadConversation, addComment } from '../../../actions';
import { priNetwork } from '../../../utils/network';

import './CommentItem.css';

class CommentItem extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    replyTo: PropTypes.object,
    conversationList: PropTypes.array,
    author: PropTypes.object,
    content: PropTypes.string,
    createdTime: PropTypes.string,
    isAuthor: PropTypes.bool,
    loadConversation: PropTypes.func,
    showConversationBtn: PropTypes.bool,
    context: PropTypes.object,
    store: PropTypes.object,
    addComment: PropTypes.func
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      showConversation: false,
      showReplyEditor: false,
      editorContentObj: []
    };
  }

  handleClickReply = () => {
    console.log('准备回复');

    this.setState({
      showReplyEditor: true
    });
  }

  handleShowConversation = () => {
    console.log('准备用modal显示这两个人之间的对话');

    // 后台拿到commentId,然后去找这个commentId下的replyTo字段就可以得到是回复给谁的,然后在两个人的所有评论中
    // 找出replyTo是对方的评论,最后按**时间顺序**返回找到的这些评论,注意返回的结果集中的第一条肯定是没有replyTo字段的
    this.props.loadConversation({
      commentId: this.props.id
    });

    this.setState({
      showConversation: true
    });
  }

  handleCancelConversationModal = () => {
    this.setState({
      showConversation: false
    });
  }

  handleEditorContentChange = editorContentObj => {
    this.setState({
      editorContentObj
    });
  }

  handleEditorSubmit = () => {
    const editorHtmlContent = this.state.editorContentObj.toString('html');
    const { id: replyId } = this.props;

    console.log(`准备提交评论内容:${editorHtmlContent}`);

    priNetwork.post({
      url: globalConfig.api.post.commentEditor.createUrl,
      data: {
        replyId,
        content: editorHtmlContent
      },
      responseErrorHandler: () => {
        const context = this.context.quietWaterLanguage ? this.context : this.props.context;

        Message.error(context.quietWaterLanguage.OperationError.whenAddCommentError, 3);
      }
    })
    .then(({ status, comment }) => {
      if (status === 'ok') {
        this.props.addComment(comment);
      }
    });
  }

  hancleCancelEditor = () => {
    this.setState({
      showReplyEditor: false
    });
  }

  render () {
    const {
      conversationList,
      author,
      isAuthor,
      replyTo,
      createdTime,
      content,
      showConversationBtn
    } = this.props;

    // TODO 抽象一个组件,用于提供context(如果this.context有,就取this.context,没有就从props.context取,然后把当前组件作为它的子组件,当前组件要使用context统一从props.context取)
    const context = this.context.quietWaterLanguage ? this.context : this.props.context;
    const { cancelText, submitText } = context.quietWaterLanguage.Editor.commentEditor;
    const { replyText } = context.quietWaterLanguage.Comment.operationBar;

    // TODO 可以删除评论
    // TODO 限制content的大小,根据换行符和字数,或者根据高度进行限制
    // TODO 当滚动在内容区域时,采用modal来显示评论,而不是展开评论,因为这样不利于阅读
    // TODO 知乎目前的查看对话模式是,点击之后会显示所有的对话记录,虽然这样有利于了解上下文,但是后面看看需不需要只显示回复的那条以及那条之后评论
    // TODO 而且目前点击查看对话是从服务端获取数据,之后看看是否提供一个配置项,让从store里直接获取,因为有的网站并不要求这么高的实时性
    return (
      <div styleName="wrap" style={globalConfig.styles.comment}>
        <CommentItemHeaderAndContent
          context={context}
          author={author}
          isAuthor={isAuthor}
          replyTo={replyTo}
          createdTime={createdTime}
          content={content}
        />

        {!this.state.showReplyEditor &&
          <CommentItemOperation
            key="cio"
            context={context}
            replyTo={replyTo}
            onClickReply={this.handleClickReply}
            onShowConversation={this.handleShowConversation}
            showConversationBtn={showConversationBtn}
          />
        }

        {this.state.showReplyEditor &&
          [
            <MiniEditor
              key="med"
              context={context}
              styleName="editor-wrap"
              widthSubmitBtn={false}
              onContentChange={this.handleEditorContentChange}
              placeholder={`${replyText}${author.userName}...`}
            />,
            <div key="edo" styleName="editorOperation">
              <button styleName="cancelBtn btn" onClick={this.hancleCancelEditor}>{cancelText}</button>

              <OnlyHasLoginedCanClick>
                <button styleName="submitBtn" onClick={this.handleEditorSubmit}>{submitText}</button>
              </OnlyHasLoginedCanClick>
            </div>
          ]
        }

        { this.state.showConversation && conversationList.length > 0 &&
          <Modal
            key="clm"
            width="52%"
            styleName="conversationBox"
            style={globalConfig.styles.conversationBox}
            visible
            onCancel={this.handleCancelConversationModal}
            dialogContentElement={<ConversationBox conversationList={conversationList} context={context} />}
          />
        }
      </div>
    );
  }
};

/* TODO
  看看如何将CommentItem内部的showConversation与下面的selector通过非redux的方式(因为showConversation不适合放在redux里)
  结合起来(即在showConversation的时候才去getConversationList),从而避免所有的CommentItem在一开始都要进行getConversationList,而这是不必要的,即便selector可以缓存
*/
const mapStateToProps = (state, ownProps) => {
  return {
    conversationList: getConversationList(ownProps.reply, ownProps.author.userId, ownProps.replyTo.userId)(state)
  };
};

export default connect(mapStateToProps, { loadConversation, addComment })(CommentItem);
