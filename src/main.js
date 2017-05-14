import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';

import AppContainer from './containers/AppContainer';

import createAppStore from './store/createAppStore';
import globalConfig from './globalConfig';
import { network } from './utils/network';
import { getCurrentUserId } from './utils/user';
import { wouldClearedStorageItemWhenPageUnload, info2Storage } from './globalParam';

const MOUNT_NODE = document.getElementById('root');

// 清除某些全局配置，在窗口关闭时调用
// clear some global settings when close brower window/tab
const clearGlobalSettings = () => {
  wouldClearedStorageItemWhenPageUnload.forEach(item => {
    localStorage.removeItem(item);
  });
};
window.addEventListener('beforeunload', function (event) {
  clearGlobalSettings();
});

// 配置用户信息
export const configUserInfo = () => {
  const userId = getCurrentUserId();

  if (userId !== null) {
    return network.get(globalConfig.api.userInfoUrl, { id: userId })
    .then(res => {
      Object.keys(info2Storage).forEach(infoKey => {
        localStorage.setItem(info2Storage[infoKey], res.userInfo[infoKey]);
      });
    });
  }
};

// 初始化某些全局配置
const initGlobalSettings = () => {
  configUserInfo();
};
initGlobalSettings();

const store = createAppStore();
if (__DEV__) {
  window.reduxStore = store;
}

const render = () => {
  const routes = require('./routes/index').default;

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  );
};

// Hot Module Replacement API
if (__DEV__) {
  if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const reducers = require('./reducers').default;
      const combinedReducers = combineReducers({ ...reducers });

      store.replaceReducer(combinedReducers);
    });
  }

  if (module.hot) {
    module.hot.accept('./routes/index', () => {
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
}

render();
