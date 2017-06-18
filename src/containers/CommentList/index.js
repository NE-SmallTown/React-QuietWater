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
import ReactScroll from 'react-scroll';

import { CommentItem } from '../../components/custom/Comment';
import Pagination from '../../components/Pagination';
import MiniEditor from '../../components/MiniEditor';
import Loading from '../../components/Loading';
import Message from '../../components/Message';

import globalConfig from '../../globalConfig';
import { loadComment, COMMENT_REQUEST, COMMENT_SUCCESS, addComment } from '../../actions';
import { getCommentList, getPagination } from '../../selectors';
import { priNetwork } from '../../utils/network';

import './index.css';

class CommentList extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    loadComment: PropTypes.func,
    replyId: PropTypes.string,
    commentCount: PropTypes.number,
    commentList: PropTypes.array,
    commentListPagination: PropTypes.object,
    showConversationBtn: PropTypes.bool,
    context: PropTypes.object,
    store: PropTypes.object,
    addComment: PropTypes.func
  }

  static defaultProps = {
    showConversationBtn: true
  }

  static contextTypes = {
    store: PropTypes.object,
    quietWaterLanguage: PropTypes.object
  }

  constructor (props) {
    super(props);

    // 虽然目前不能多种排序切换,但是后面会考虑做,所以这里先把order写在state里了
    this.state = {
      order: 'createdTime'
    };
  }

  componentDidMount () {
    this.props.loadComment({
      replyId: this.props.replyId,
      currentPage: 1,
      pageSize: globalConfig.paginations.commentList.pageSize,
      order: this.state.order
    });
  }

  handlePaginationChange = (currentPage, pageSize) => {
    const replyId = this.props.replyId;

    ReactScroll.scroller.scrollTo(`qw_${replyId}_clh`); // clh means commentList-header

    this.props.loadComment({
      replyId,
      currentPage,
      pageSize,
      order: this.state.order
    });
  }

  handleEditorSubmit = editorContent => {
    console.log(`准备提交评论内容:${editorContent}`);

    const editorHtmlContent = editorContent.toString('html');
    const { replyId } = this.props;

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

  render () {
    const { replyId, className, commentList, commentListPagination, showConversationBtn } = this.props;

    const context = this.context.quietWaterLanguage ? this.context : this.props.context;
    const { countTextPostfix } = context.quietWaterLanguage.Comment.headerTitle;
    const { placeholderText } = context.quietWaterLanguage.Editor.commentEditor;

    // TODO 可以按自定义方式排序,比如热度,点赞数等等
    // TODO 用户可以针对评论中的某一小段（30个字以内?）进行针对性的回复（为什么是一小段呢，因为如果让用户可以选择针
    // TODO 对一大段内容进行回复，那么评论区可能出现大量的重复内容,这是无法接受的）,对于大段内容,有“查看对话”这个功能
    return (
      <div styleName="wrap" className={className}>
        <ReactScroll.Element name={`qw_${replyId}_clh`}>
          <div styleName="header">
            <span styleName="commentCountText">
              {commentListPagination && `${commentListPagination.totalCount || commentList.length}${countTextPostfix}`}
            </span>
          </div>
        </ReactScroll.Element>

        <Loading
          store={context.store || this.props.store}
          actionTypeOfStartFetching={COMMENT_REQUEST}
          actionTypeOfFinishFetching={COMMENT_SUCCESS}
        >
          {
            commentList.length > 0 &&
            commentList.map(comment =>
              <CommentItem
                key={comment.id}
                context={context}
                store={context.store}
                showConversationBtn={showConversationBtn}
                {...comment}
              />
            )
          }

          {commentListPagination &&
            <Pagination
              key="pg"
              context={context}
              styleName="pagination-wrap"
              pageSize={commentListPagination.pageSize}
              current={commentListPagination.currentPage}
              total={commentListPagination.totalCount}
              onChange={this.handlePaginationChange}
            />
          }

          <MiniEditor
            key="med"
            context={context}
            styleName="editor-wrap"
            onSubmit={this.handleEditorSubmit}
            placeholder={placeholderText}
          />
        </Loading>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  commentList: getCommentList(ownProps.replyId)(state),
  commentListPagination: getPagination(ownProps.replyId)(state)
});

export default connect(mapStateToProps, {
  loadComment,
  addComment
})(CommentList);
