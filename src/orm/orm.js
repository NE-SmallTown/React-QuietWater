/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/4/30
 */

import { ORM } from 'redux-orm';
import { Comment, Host, Reply, User, Pagination } from './models';

const orm = new ORM();
orm.register(Comment, Host, Reply, User, Pagination);

export default orm;
