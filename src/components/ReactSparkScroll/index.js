/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/13 by Heaven
 */

import configReactSparckScroll from 'react-spark-scroll/lib/spark-scroll-gsap';

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
