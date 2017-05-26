/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/4/30
 */

import { ORM } from 'redux-orm';
import { Comment, Host, Reply, User, Pagination } from './models';

const orm = new ORM();
// TODO 将下面的MODEL里的对应各类action的SUCCESS的部分抽象一下,因为SUCCESS对应创建(orm中没这个id)以及更新(orm中有这个id)两种操作,目前没有设置更新
orm.register(Comment, Host, Reply, User, Pagination);

export default orm;
