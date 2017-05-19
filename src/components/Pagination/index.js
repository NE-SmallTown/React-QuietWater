/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/18 by Administrator
 */

import React from 'react';
import PropTypes from 'prop-types';

import RcPagination from 'rc-pagination';

import * as paginationLanguages from './languages';

import './index.css';

export default class Pagination extends React.PureComponent {
  static propTypes = {
    current: PropTypes.number,
    defaultCurrent: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    defaultPageSize: PropTypes.number,
    onChange: PropTypes.func,
    showSizeChanger: PropTypes.bool,
    showLessItems: PropTypes.bool,
    onShowSizeChange: PropTypes.func,
    selectComponentClass: PropTypes.func,
    showQuickJumper: PropTypes.bool,
    showTitle: PropTypes.bool,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
    showTotal: PropTypes.func,
    locale: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    showTitle: false,
    showLessItems: true
  }

  static contextTypes = {
    quietWaterLanguage: PropTypes.object
  }

  render () {
    const { className, ...restprops } = this.props;

    return (
      <RcPagination
        className={className}
        locale={paginationLanguages[this.context.quietWaterLanguage.languageName]}
        {...restprops}
      />
    );
  }
};

