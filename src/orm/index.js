/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/30
 */

import orm from './orm';

const emptyDBState = orm.getEmptyState();

const session = orm.session(emptyDBState);

export default orm;
