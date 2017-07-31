/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/3 by Heaven
 */
import React from 'react';
import PropTypes from 'prop-types';

import './QuietWaterHeader.css';

export class QuietWaterHeader extends React.PureComponent {
  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  static propTypes = {
    replyCount: PropTypes.number
  }

  render () {
    const { replyCount } = this.props;
    const { countTextPostfix } = this.context.quietWaterLanguage.QuietWater.headerTitle;

    return (
      <div styleName="wrap">
        {replyCount !== 0 && <span styleName="replyCountText">{`${replyCount} ${countTextPostfix}`}</span>}
      </div>
    );
  }
};
