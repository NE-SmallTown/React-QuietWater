/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/30 by Heaven
 */

import orm from './orm';

const emptyDBState = orm.getEmptyState();

orm.session(emptyDBState);

export default orm;
