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

import { CommentItem } from '../../components/custom/Comment';
import Pagination from '../../components/Pagination';
import MiniEditor from '../../components/MiniEditor';
import Lodaing from '../../components/Lodaing';

import { loadComment, COMMENT_REQUEST, COMMENT_SUCCESS, Conversation_REQUEST, Conversation_SUCCESS } from '../../actions';
import { getCommentList, getPagination } from '../../selectors';

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
    store: PropTypes.object
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
      pageSize: 10,
      order: this.state.order
    });
  }

  handlePaginationChange = (currentPage, pageSize) => {
    this.props.loadComment({
      replyId: this.props.replyId,
      currentPage,
      pageSize,
      order: this.state.order
    });
  }

  handleEditorSubmit = editorContent => {
    console.log(`准备提交评论内容:${editorContent}`);
  }

  render () {
    const { className, commentList, commentListPagination, showConversationBtn } = this.props;

    const context = this.context.quietWaterLanguage ? this.context : this.props.context;
    const { countTextPostfix } = context.quietWaterLanguage.Comment.headerTitle;
    const { placeholderText } = context.quietWaterLanguage.Editor.commentEditor;

    // TODO 可以按自定义方式排序,比如热度,点赞数等等
    // TODO 用户可以针对评论中的某一小段（30个字以内?）进行针对性的回复（为什么是一小段呢，因为如果让用户可以选择针
    // TODO 对一大段内容进行回复，那么评论区可能出现大量的重复内容,这是无法接受的）,对于大段内容,有“查看对话”这个功能
    return (
      <div styleName="wrap" className={className}>
        <div styleName="header">
          <span styleName="commentCountText">
            {commentListPagination && `${commentListPagination.totalCount || commentList.length}${countTextPostfix}`}
            </span>
        </div>

        <Lodaing
          store={context.store || this.props.store}
          actionTypeOfStartFetching={[COMMENT_REQUEST, Conversation_REQUEST]}
          actionTypeOfFinishFetching={[COMMENT_SUCCESS, Conversation_SUCCESS]}
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
        </Lodaing>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  commentList: getCommentList(ownProps.replyId)(state),
  commentListPagination: getPagination(ownProps.replyId)(state)
});

export default connect(mapStateToProps, {
  loadComment
})(CommentList);
