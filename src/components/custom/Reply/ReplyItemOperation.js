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
import { OnlyHasLoginedCanClick } from '../Auth';

import { priNetwork } from '../../../utils/network';
import globalConfig from '../../../globalConfig';
import { getToken as getCurHostUserToken } from '../../../security/authService';
import { updatePraiseCount } from '../../../actions';
import getNewLocationHrefWithHash from '../../../utils/getNewLocationHrefWithHash';
import { getCommentListCount } from '../../../selectors';

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
    onClickExpandComment: PropTypes.func,
    className: PropTypes.string,
    userToken: PropTypes.string,
    updatePraiseCount: PropTypes.func,
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
      hasPraised: false,
      hasThumbdown: false
    };
  }

  _handlePraiseOrThumbDown = (type) => {
    if (typeof type !== 'number') {
      warning(false, `type must be a number but passed in ${type}`);

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

  render () {
    const {
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

    const {
      Reply: { shareText, commentBtnPostfix, expandText, foldText, foldCommentText }
    } = this.context.quietWaterLanguage;

    // TODO 所有的icon图标下载到本地,而不是引用cdn
    // TODO 图标可配置
    // TODO 图标的命名是否需要统一(展开图标到底是叫expand还是根据形状划分叫triangle-down)
    // TODO 现在权限还不复杂,暂时没考虑针对权限控制进行抽象
    const praiseBtnClassName = classNames('btn-praise', {
      'btn-praise-active': this.state.hasPraised
    });
    const thumbdownBtnClassName = classNames('btn-thumbdown', {
      'btn-thumbdown-active': this.state.hasThumbdown
    });

    return (
      <div style={style} styleName="wrap" className={`clearfix ${className}`}>
        <OnlyHasLoginedCanClick>
          <button styleName={praiseBtnClassName} onClick={this.handleClickPraiseBtn}>
            <SvgIcon iconName="icon-praise3" styleName="icon-praise" />

            {praiseCount}
          </button>
        </OnlyHasLoginedCanClick>

        <OnlyHasLoginedCanClick>
          <button styleName={thumbdownBtnClassName} onClick={this.handleClickThumbdownBtn}>
            <SvgIcon iconName="icon-thumbdown3" styleName="icon-thumbdown" />
          </button>
        </OnlyHasLoginedCanClick>

        <button styleName="btn-comment" onClick={this.handleClickCommentBtn}>
          <SvgIcon iconName="icon-comment1" styleName="icon-comment" />

          {`${showCommentList ? foldCommentText : commentCount + commentBtnPostfix}`}
        </button>

        <Popover
          trigger="click"
          content={
            this.state.showShareList
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
  userToken: getCurHostUserToken(),
  commentListCount: getCommentListCount(ownProps.replyId)(state)
});

export default connect(mapStateToProps, {
  updatePraiseCount
})(ReplyItemOperation);
