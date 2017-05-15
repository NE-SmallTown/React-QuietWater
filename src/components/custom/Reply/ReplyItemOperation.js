/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/9 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import SvgIcon from '../../SvgIcon';

import { priNetwork } from '../../../utils/network';
import globalConfig from '../../../globalConfig';
import { getToken as getCurHostUserToken } from '../../../security/authService';
import { updatePraiseCount } from '../../../actions/QuietWater';

import './ReplyItemOperation.css';

const { praiseUrl } = globalConfig.api.post.operationBar;
class ReplyItemOperation extends React.PureComponent {
  static propTypes = {
    replyId: PropTypes.string,
    commentCount: PropTypes.number,
    praiseCount: PropTypes.number,
    isContentExpanded: PropTypes.bool,
    isContentTooLong: PropTypes.bool,
    onClickReadAll: PropTypes.func,
    onClickFold: PropTypes.func,
    className: PropTypes.string,
    userToken: PropTypes.string,
    updatePraiseCount: PropTypes.func
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  _handlePraiseOrThumbDown = debounce((type) => {
    if (typeof type !== 'number') {
      console.warn(`type must be a number but passed in ${type}`);

      return;
    }

    if (this.props.userToken === null) {
      location.replace(globalConfig.api.hostUserLoginUrl);

      return;
    }

    const oldPraiseCount = this.props.praiseCount;
    const newPraiseCount = oldPraiseCount + type;

    const { replyId, userToken } = this.props;
    priNetwork.post({
      url: praiseUrl,
      data: {
        replyId,
        praiseCount: newPraiseCount,
        userToken
      },
      responseStatusHandler: status => {
        console.log(status);
        if (status === 'ok') {
          this.props.updatePraiseCount(replyId, newPraiseCount);
        }
      }
    });
  }, 1000, { leading: true, 'trailing': false })

  handleClickPraiseBtn = () => {
    console.log('点赞');

    this._handlePraiseOrThumbDown(1);
  }

  handleClickThumbdownBtn = () => {
    console.log('踩');

    this._handlePraiseOrThumbDown(-1);
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
    const {
      Reply: { shareText, commentBtnPostfix, expandText, foldText }
    } = this.context.quietWaterLanguage;

    // TODO 图标下载到本地
    // TODO 只能点赞一次
    // TODO 图标可配置
    // TODO 图标的命名是否需要统一(展开图标到底是叫expand还是根据形状划分叫triangle-down)
    // TODO 现在权限还不复杂,暂时没考虑针对权限控制进行抽象
    return (
      <div styleName="wrap" className={`clearfix ${className}`}>
        <button styleName="btn-praise" onClick={this.handleClickPraiseBtn}>
          <SvgIcon iconName="icon-praise3" styleName="icon-praise" />

          {praiseCount}
        </button>

        <button styleName="btn-thumbdown" onClick={this.handleClickThumbdownBtn}>
          <SvgIcon iconName="icon-thumbdown3" styleName="icon-thumbdown" />
        </button>

        <button styleName="btn-comment" onClick={this.handleClickCommentBtn}>
          <SvgIcon iconName="icon-comment1" styleName="icon-comment" />

          {`${commentCount}${commentBtnPostfix}`}
        </button>

        <button styleName="btn-share" onClick={this.handleClickShareBtn}>
          <SvgIcon iconName="icon-share2" styleName="icon-share" />

          {shareText}
        </button>

        { isContentTooLong
          ? isContentExpanded
            ? <button styleName="btn-fold" onClick={this.handleClickFold}>
                {foldText}

                <SvgIcon iconName="icon-fold2" styleName="icon-fold" />
              </button>
            : <button styleName="btn-expand" onClick={this.handleClickExpand}>
                {expandText}

                <SvgIcon iconName="icon-expand2" styleName="icon-expand" />
              </button>
          : null
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  userToken: getCurHostUserToken()
});

export default connect(mapStateToProps, {
  updatePraiseCount
})(ReplyItemOperation);
