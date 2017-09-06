/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/9 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import classNames from 'classnames';
import warning from 'warning';

import Popover from '../../Popover';
import SvgIcon from '../../SvgIcon';
import Button from '../Button';
import { OnlyHasLoginedCanClick, OnlyCurrentUserCanSee } from '../Auth';

import { priNetwork } from '../../../utils/network';
import globalConfig from '../../../globalConfig';
import { updatePraiseCount, deleteReply } from '../../../actions';
import getNewLocationHrefWithHash from '../../../utils/getNewLocationHrefWithHash';
import { getCommentListCount } from '../../../selectors';

import './ReplyItemOperation.css';

class ReplyItemOperation extends React.PureComponent {
  static propTypes = {
    authorId: PropTypes.string,
    replyId: PropTypes.string,
    commentCount: PropTypes.number,
    praiseCount: PropTypes.number,
    isContentExpanded: PropTypes.bool,
    isContentTooLong: PropTypes.bool,
    onClickReadAll: PropTypes.func,
    onClickFold: PropTypes.func,
    onClickExpandComment: PropTypes.func,
    className: PropTypes.string,
    updatePraiseCount: PropTypes.func,
    deleteReply: PropTypes.func,
    excerpt: PropTypes.string,
    style: PropTypes.object,
    commentListCount: PropTypes.number,
    showCommentList: PropTypes.bool
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      showShareList: false,
      showSettings: false,
      hasPraised: false,
      hasThumbdown: false
    };
  }

  _handlePraiseOrThumbDown = (type) => {
    if (typeof type !== 'number') {
      warning(false, `type must be a number but passed in ${type}`);

      return;
    }

    const oldPraiseCount = this.props.praiseCount;
    const newPraiseCount = oldPraiseCount + type;

    const { praiseUrl } = globalConfig.api.post.operationBar;

    const { replyId } = this.props;
    priNetwork.post({
      url: praiseUrl,
      data: {
        replyId,
        praiseCount: newPraiseCount
      },
      responseStatusHandler: status => {
        if (status === 'ok') {
          this.props.updatePraiseCount(replyId, newPraiseCount);
        }
      }
    });
  }

  handleClickPraiseBtn = debounce(() => {
    if (this.state.hasThumbdown) {
      return;
    }

    const hasPraised = this.state.hasPraised;
    this.setState({ hasPraised: !hasPraised });

    const num = hasPraised ? -1 : 1;

    this._handlePraiseOrThumbDown(num);
  }, 1000, { leading: true, 'trailing': false })

  handleClickThumbdownBtn = debounce(() => {
    if (this.state.hasPraised) {
      return;
    }

    const hasThumbdown = this.state.hasThumbdown;
    this.setState({ hasThumbdown: !hasThumbdown });

    const num = hasThumbdown ? 1 : -1;

    this._handlePraiseOrThumbDown(num);
  }, 1000, { leading: true, 'trailing': false })

  handleClickCommentBtn = () => {
    this.props.onClickExpandComment && this.props.onClickExpandComment();
  }

  handleClickShareBtn = () => {
    this.setState({
      showShareList: true
    });
  }

  handleClickExpand = () => {
    console.log('显示此回复的全部内容');

    this.props.onClickReadAll && this.props.onClickReadAll();
  }

  handleClickFold = () => {
    console.log('折叠此回复');

    this.props.onClickFold && this.props.onClickFold();
  }

  handleClickSettings_CloseComment = () => {
    this.setState({
      showSettings: false
    });

    console.log('已关闭此回复的评论');
  }

  handleClickSettings_DeleteReply = () => {
    console.log('准备删除此回复');

    const { deleteUrl } = globalConfig.api.post.operationBar;

    const { replyId } = this.props;
    priNetwork.post({
      url: deleteUrl,
      data: {
        replyId
      },
      responseStatusHandler: status => {
        if (status === 'ok') {
          this.props.deleteReply(this.props.replyId);
        }
      }
    });
  }

  getSettingsElement = () => {
    const { closeComment, deleteText } = this.context.quietWaterLanguage.Reply.settings;

    return [
      <Button
        key="cc"
        styleName="settings-item btn-closeComment"
        theme="clickWithLeftIcon"
        onClick={this.handleClickSettings_CloseComment}
      >
        {closeComment}
      </Button>,
      <Button
        key="dr"
        styleName="settings-item"
        theme="text"
        onClick={this.handleClickSettings_DeleteReply}
      >
        {deleteText}
      </Button>
    ];
  }

  handleSettingsVisibleChange = visible => {
    this.setState({
      showSettings: visible
    });
  }

  render () {
    const {
      authorId,
      replyId,
      excerpt,
      commentCount = this.props.commentListCount,
      praiseCount,
      isContentExpanded,
      className,
      isContentTooLong,
      style,
      showCommentList
    } = this.props;

    const { hasPraised, hasThumbdown, showSettings, showShareList } = this.state;

    const {
      Reply: {
        settings: { settingsText },
        shareText,
        commentBtnPostfix,
        expandText,
        foldText,
        foldCommentText
      }
    } = this.context.quietWaterLanguage;

    const settingsElement = this.getSettingsElement();

    // TODO 图标可配置
    // TODO 图标的命名是否需要统一(展开图标到底是叫expand还是根据形状划分叫triangle-down)
    const praiseBtnClassName = classNames('btn-praise', {
      'btn-praise-active': hasPraised
    });
    const thumbdownBtnClassName = classNames('btn-thumbdown', {
      'btn-thumbdown-active': hasThumbdown
    });

    return (
      <div style={style} styleName="wrap" className={`clearfix ${className}`}>
        {/* 投赞同票 */}
        <OnlyHasLoginedCanClick>
          <button styleName={praiseBtnClassName} onClick={this.handleClickPraiseBtn}>
            <SvgIcon iconName="icon-praise3" styleName="icon-praise" />

            {praiseCount}
          </button>
        </OnlyHasLoginedCanClick>

        {/* 投反对票 */}
        <OnlyHasLoginedCanClick>
          <button styleName={thumbdownBtnClassName} onClick={this.handleClickThumbdownBtn}>
            <SvgIcon iconName="icon-thumbdown3" styleName="icon-thumbdown" />
          </button>
        </OnlyHasLoginedCanClick>

        {/* 展示评论 */}
        <button styleName="btn-comment" onClick={this.handleClickCommentBtn}>
          <SvgIcon iconName="icon-comment1" styleName="icon-comment" />

          {`${showCommentList ? foldCommentText : commentCount + commentBtnPostfix}`}
        </button>

        {/* 分享 */}
        <Popover
          trigger="click"
          content={
            showShareList
            ? <div>
                {Object.keys(globalConfig.api.share).map(key => {
                  const shareObj = globalConfig.api.share[key];

                  if (typeof shareObj.getComponent !== 'undefined') {
                    return shareObj.getComponent({
                      replyUrl: getNewLocationHrefWithHash(`qw_${replyId}_h`),
                      sharedText: excerpt.substr(0, 20)
                    });
                  } else {
                    warning(false,
                      `each property in the share must provide a getComponent function, but '${key}' in the config.api.share object doesn't`);
                  }
                })}
              </div>
            : undefined
          }
        >
          <div styleName="share-wrap">
            <button styleName="btn-share" onClick={this.handleClickShareBtn}>
              <SvgIcon iconName="icon-share2" styleName="icon-share" />

              {shareText}
            </button>
          </div>
        </Popover>

        {/* 设置 */}
        <OnlyCurrentUserCanSee userId={authorId}>
          <Popover
            trigger="click"
            visible={showSettings}
            onVisibleChange={this.handleSettingsVisibleChange}
            content={settingsElement}
          >
            <div styleName="settings-wrap">
              <button styleName="btn-settings">
                <SvgIcon iconName="icon-settings1" styleName="icon-settings" />

                {settingsText}
              </button>
            </div>
          </Popover>
        </OnlyCurrentUserCanSee>

        {/* 阅读更多/收起 */}
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

const mapStateToProps = (state, ownProps) => ({
  commentListCount: getCommentListCount(ownProps.replyId)(state)
});

export default connect(mapStateToProps, {
  updatePraiseCount,
  deleteReply
})(ReplyItemOperation);
