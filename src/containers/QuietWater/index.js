/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/30
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReplyList from '../ReplyList';
import AddReply from '../AddReply';
import { QuietWaterHeader } from '../../components/custom/QuietWater';

import { loadQuietWaterOfHost } from '../../actions';
import { getReplyList } from '../../selectors/';

import './index.css';

class QuietWater extends React.PureComponent {
  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }
  
  static propTypes = {
    replyList: PropTypes.array,
    loadQuietWaterOfHost: PropTypes.func,
    hostId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quietWaterWidth: PropTypes.number
  }

  static defaultProps = {
    replyList: []
  }

  componentDidMount () {
    this.props.loadQuietWaterOfHost({ hostId: this.props.hostId });
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
          <button styleName="btn-loadMoreReply">{loadMoreReplyText}</button>
        </div>

        <AddReply />
      </div>
    );
  }
}

const mapStateToProps = (state, ownPorps) => ({
  replyList: getReplyList(ownPorps.hostId)(state),
  hostId: ownPorps.hostId
});

export default connect(
  mapStateToProps,
  { loadQuietWaterOfHost }
)(QuietWater);
