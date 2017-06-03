/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/3 by Heaven
 */

import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { ReplyItem } from '../../components/custom/Reply';

import globalConfig from '../../globalConfig';

import './index.css';

export default class ReplyList extends React.PureComponent {
  static propTypes = {
    replyList: PropTypes.array,
    quietWaterWidth: PropTypes.number
  }

  constructor (props) {
    super(props);

    this.replyListIds = props.replyList && props.replyList.map(reply => reply.id);

    this.keyPressListenerFunc = e => {
      // if now we are in the editor,don't react any key event
      const excludes = globalConfig.events.quietWater.responsePrevOrNextReplyExcludeIn;
      if (excludes.some(
        v => document.activeElement.hasAttribute(v) || document.activeElement.nodeName.toLowerCase() === v
      )) {
        return;
      }

      const key = e.key.toLowerCase();

      const { prevReplyPressKey, nextReplyPressKey } = globalConfig.events.quietWater;

      const curHashCorrespondingId = sessionStorage.getItem(globalConfig.sessionStorage.keyOfCurrentReplyItemHash);
      let indexOfCurHashCorrespondingId = this.replyListIds.indexOf(curHashCorrespondingId);
      let newId;

      if (curHashCorrespondingId === '' || indexOfCurHashCorrespondingId === -1) {
        return;
      }

      switch (key) {
        case prevReplyPressKey:
          if (indexOfCurHashCorrespondingId !== 0) {
            indexOfCurHashCorrespondingId--;
          }

          break;
        case nextReplyPressKey:
          if (indexOfCurHashCorrespondingId !== this.replyListIds.length - 1) {
            indexOfCurHashCorrespondingId++;
          }

          break;
      }

      switch (key) {
        case prevReplyPressKey:
        case nextReplyPressKey:
          newId = this.replyListIds[indexOfCurHashCorrespondingId];

          browserHistory.push(`#qw_${newId}_h`);
      }
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      const nextReplyListIds = nextProps.replyList.map(reply => reply.id);

      if (this.replyListIds.toString() !== nextReplyListIds.toString()) {
        this.replyListIds = nextReplyListIds;
      }
    }
  }

  componentDidMount () {
    window.addEventListener('keypress', this.keyPressListenerFunc);
  }

  componentDidUpdate () {
    if (this.replyListIds.length > 0 && !this.hasSetFirstItemToSessionStorage) {
      sessionStorage.setItem(globalConfig.sessionStorage.keyOfCurrentReplyItemHash, this.replyListIds[0]);

      this.hasSetFirstItemToSessionStorage = true;
    }
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
