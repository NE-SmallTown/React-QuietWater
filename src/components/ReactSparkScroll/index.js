/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/13 by Administrator
 */

import configReactSparckScroll from 'react-spark-scroll';

const factory = configReactSparckScroll({
  invalidateAutomatically: true
});

export const sparkScrollFactory = factory.sparkScrollFactory;
export const sparkProxyFactory = factory.sparkProxyFactory;
export const SparkScroll = factory.SparkScroll;
export const SparkProxy = factory.SparkProxy;
export const invalidate = factory.invalidate;
export const enableInvalidationInterval = factory.enableInvalidationInterval;
export const disableInvalidationInterval = factory.disableInvalidationInterval;
