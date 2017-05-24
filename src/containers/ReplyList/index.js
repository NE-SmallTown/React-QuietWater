/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/3 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { ReplyItem } from '../../components/custom/Reply';

import globalConfig from '../../globalConfig';
import getNewLocationHrefWithHash from '../../utils/getNewLocationHrefWithHash';

import './index.css';

export default class ReplyList extends React.PureComponent {
  static propTypes = {
    replyList: PropTypes.array,
    quietWaterWidth: PropTypes.number
  }

  constructor (props) {
    super(props);

    this.replyListIds = props.replyList && props.replyList.map(reply => reply.id);
    this.hasReplyListIdsChanged = false;

    this.keyPressListenerFunc = e => {
      if (document.activeElement.hasAttribute('contenteditable')) { // if now we are in the editor,don't react any key event
        return;
      }

      const key = e.key.toLowerCase();

      const { prevReplyPressKey, nextReplyPressKey } = globalConfig.events.quietWater;

      const curHashCorrespondingId = location.hash.substr(4); // Because now the hash format is '#qw_12345678'
      const indexOfCurHashCorrespondingId = this.replyListIds.indexOf(curHashCorrespondingId);
      let newId;

      switch (key) {
        case prevReplyPressKey:
          if (indexOfCurHashCorrespondingId === 0) {
            break;
          }

          newId = this.replyListIds[indexOfCurHashCorrespondingId - 1];
          browserHistory.push(`#qw_${newId}`);

          break;
        case nextReplyPressKey:
          if (indexOfCurHashCorrespondingId === this.replyListIds.length - 1) {
            break;
          }

          newId = this.replyListIds[indexOfCurHashCorrespondingId + 1];
          browserHistory.push(`#qw_${newId}`);

          break;
      }
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      const nextReplyListIds = nextProps.replyList.map(reply => reply.id);

      if (this.replyListIds.toString() !== nextReplyListIds.toString()) {
        this.replyListIds = nextReplyListIds;

        this.hasReplyListIdsChanged = true;
      } else {
        this.hasReplyListIdsChanged = false;
      }
    }
  }

  componentDidMount () {
    window.addEventListener('keypress', this.keyPressListenerFunc);
  }

  componentWillUnMount () {
    window.removeEventListener('keypress', this.keyPressListenerFunc);
  }

  render () {
    const { replyList, quietWaterWidth } = this.props;

    return (
      <div styleName="wrap" style={globalConfig.styles.replyList}>
        {replyList.map(
          (reply, index) =>
            <ReplyItem
              key={reply.id}
              isFirstReplyItem={index === 0}
              replyWrapElementWidth={quietWaterWidth}
              {...reply}
            />
        )}
      </div>
    );
  }
};
