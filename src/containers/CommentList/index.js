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
import { getCommentList } from '../../selectors';

import './index.css';

class CommentList extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    commentList: PropTypes.array
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  componentDidMount () {
    this.props.loadComment({
      replyId: this.props.replyId,
      limit: ,
      order: ,
      offset:
    });
  }

  render () {
    const { className, commentList, commentCount } = this.props;

    const { countTextPostfix } = this.context.quietWaterLanguage.Comment.headerTitle;

    // TODO 可以按时间排序
    return (
      <div styleName="wrap" className={className}>
        <div styleName="header">
          <span styleName="commentCountText">{`${commentCount}${countTextPostfix}`}</span>
        </div>

        {commentList.map(comment => <CommentItem key={comment.id} {...comment} />)}

        <Pagination styleName="pagination-wrap" />

        <Editor styleName="editor-wrap" />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  commentList: getCommentList(ownPorps.replyId)(state),
});

export default connect(mapStateToProps, {
  loadComment
})(Comment);
