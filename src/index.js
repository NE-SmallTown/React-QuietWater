/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/28 by Heaven
 */

// TODO 在readme写上提示,如果要做成响应式的,只需要将quietWaterWidth改变就行了,或者通过Grid组件包裹QuietWater然后设置quietWaterWidth为外层的节点的syle.width

import './assets/iconfont';

import QuietWater from './containers/QuietWater';

export default QuietWater;

export { default as LanguageProvider } from './components/Provider/LanguageProvider';

export { default as handleHashChange } from './utils/route/handleHashChange';

export { default as globalConfig } from './globalConfig';
export * from './globalConfig';

export * from './utils/user';

export * from './globalParam';
