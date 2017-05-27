/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/30 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReplyList from '../ReplyList';
import AddReply from '../AddReply';
import { QuietWaterHeader } from '../../components/custom/QuietWater';

import { loadQuietWaterOfHost, loadReply } from '../../actions';
import { getReplyList, getPagination } from '../../selectors/';

import './index.css';

class QuietWater extends React.PureComponent {
  static propTypes = {
    replyList: PropTypes.array,
    loadQuietWaterOfHost: PropTypes.func,
    hostId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quietWaterWidth: PropTypes.number,
    loadReply: PropTypes.func,
    replyListPagination: PropTypes.object
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  static defaultProps = {
    replyList: []
  }

  constructor (props) {
    super(props);

    // 目前回复列表暂时只按创建日期排序,日期越近的越靠前
    this.state = {
      order: 'createdTime'
    };
  }

  componentDidMount () {
    this.props.loadQuietWaterOfHost({ hostId: this.props.hostId });
  }

  handleLoadMoreReply = () => {
    const { currentPage, pageSize } = this.props.replyListPagination;

    this.props.loadReply({
      hostId: this.props.hostId,
      currentPage: currentPage + 1,
      pageSize: pageSize,
      order: this.state.order
    });
  }

  render () {
    const { replyList, quietWaterWidth } = this.props;
    const { loadMoreReplyText } = this.context.quietWaterLanguage.QuietWater;

    return (
      <div styleName="wrap">
        {/* 头部的东西,暂时只展示一个总标题,后面可以会增加诸如按照不同方案进行排序的选择按钮 */}
        {/* at least just show QuietWater's header title,but future maybe will add a select button to order the replies */}
        <QuietWaterHeader replyCount={replyList.length} />

        <ReplyList replyList={replyList} quietWaterWidth={quietWaterWidth} />

        <div styleName="loadMoreReply-wrap">
          <button styleName="btn-loadMoreReply" onClick={this.handleLoadMoreReply}>
            {loadMoreReplyText}
          </button>
        </div>

        <AddReply />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  replyList: getReplyList(ownProps.hostId)(state),
  hostId: ownProps.hostId,
  replyListPagination: getPagination(ownProps.hostId)(state)
});

export default connect(
  mapStateToProps,
  { loadQuietWaterOfHost, loadReply }
)(QuietWater);
