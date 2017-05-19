/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/18 by Administrator
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CommentItem } from '../../components/custom/Comment';
import Editor from '../../components/Editor';
import Pagination from '../../components/Pagination';

import { loadComment } from '../../actions';
import { getCommentList, getPagination } from '../../selectors';

import './index.css';

class CommentList extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    loadComment: PropTypes.func,
    replyId: PropTypes.string,
    commentCount: PropTypes.number,
    commentList: PropTypes.array,
    commentListPagination: PropTypes.array
  }

  static contextTypes = {
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

  render () {
    const { className, commentList, commentCount, commentListPagination } = this.props;

    const { countTextPostfix } = this.context.quietWaterLanguage.Comment.headerTitle;

    // TODO 可以按自定义方式排序,比如热度,点赞数等等
    return (
      <div styleName="wrap" className={className}>
        <div styleName="header">
          <span styleName="commentCountText">{`${commentCount}${countTextPostfix}`}</span>
        </div>

        {commentList && commentList.map(comment => <CommentItem key={comment.id} {...comment} />)}

        {commentListPagination &&
          <Pagination
            key="pg"
            styleName="pagination-wrap"
            pageSize={commentListPagination.pageSize}
            current={commentListPagination.currentPage}
            total={commentListPagination.totalCount}
            onChange={this.handlePaginationChange}
          />
        }

        <Editor key="ed" styleName="editor-wrap" />
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
