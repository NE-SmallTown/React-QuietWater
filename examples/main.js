import globalConfig, { configQuietWater } from '../src/globalConfig';
import Message from '../src/components/Message';
import SvgIcon from '../src/components/SvgIcon';
import { formatUrl } from 'url-lib';
import './example.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';

import AppContainer from '../src/containers/AppContainer';

import createAppStore from '../src/store/createAppStore';
import { network } from '../src/utils/network';
// TODO 发布时加上下面这行
// import globalConfig from './globalConfig';
import { getCurrentUserId, setCurrentUserId } from '../src/utils/user';
import { wouldClearedStorageItemWhenPageUnload, info2Storage } from '../src/globalParam';

// 配置React-QuietWater
configQuietWater({
  router: {
    user: {
      PREFIXURL: 'http://www.mysite.com/user/'
    }
  },
  api: {
    PREFIX: 'https://www.easy-mock.com/mock/590c4f0087cce4690fed1f43/qw/api/',
    P_PREFIX: 'https://www.easy-mock.com/mock/590c4f0087cce4690fed1f43/qw/api/p/',

    quietWaterInitUrl: 'https://www.easy-mock.com/mock/5919acf69aba4141cf23044d/common/rqw',
    hostUserLoginUrl: 'https://github.com/login',
    quietWaterOfHostUrl: 'articles/info',
    replyUrl: 'replies/info',
    commentUrl: 'comments/info',
    conversationUrl: 'conversations/info',

    post: {
      operationBar: {
        praiseUrl: 'reply/praise' // the post praise interface url
      }
    },

    share: {
      weibo: {
        sourceWebSiteName: '这是我网站的名称',
        sourceWebSiteUrl: 'https://www.mysite.com',
        // eslint-disable-next-line
        getComponent ({ replyUrl, sharedText }) {
          const { urlPrefix, sourceWebSiteName, sourceWebSiteUrl } = globalConfig.api.share.weibo;

          const generatedUrl = formatUrl(urlPrefix, {
            appkey: '',
            title: `${sharedText}      分享自（@${sourceWebSiteName}）`,
            url: replyUrl,
            source: sourceWebSiteName,
            sourceUrl: sourceWebSiteUrl,
            searchPic: false,
            content: 'utf8',
            style: 'simple'
          });

          return (
            <div key="wb" styleName="share-wrap">
              <a href={generatedUrl} target="_blank" styleName="share-link">新浪微博</a>
              <SvgIcon iconName="icon-weibo2" styleName="share-icon-wb" />
            </div>
          );
        }
      }
    },
    responseStatusHandler: {
      'ok': () => {
        if (__DEV__) {
          console.log(`backend's response's 'status' value is 'ok'`);
        }

        Message.success('操作成功');
      }
    },
    httpStatusExcptionHandler: {
      401: () => {
        Message.error(`你的权限无法支持你现在的操作，如果你确认自己有权限的话，请联系管理员～`);
      }
    },
    responseErrorHandler: {
      1504: () => {
        Message.error(`请不要修改localstorage里的字段，更不要拿本网站做实验，拜托了`, 5);
      },
      1505: () => {
        Message.error(`获取数据时出错，因为你的权限无法支持你现在的操作，如果你确认自己有权限的话，请联系管理员～`, 5);
      }
    }
  }
});

const MOUNT_NODE = document.getElementById('root');

// 清除某些全局配置，在窗口关闭时调用
// clear some global settings when close browser window/tab
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
  // just for test,because in real environment we has set userId to locastorage
  setCurrentUserId('xxxxxxxxxx');

  let userId = getCurrentUserId();

  // 测试的时候为了方便(即不需要一个登录页和登录相关的逻辑)我们在获取用户信息的时候返回了token,但是实际中肯定是不可能的,因为那样
  // 每个人都可以获取任意用户的token,token应该是只有登录接口才会提供
  if (userId !== null) {
    return network.get({
      url: globalConfig.api.quietWaterInitUrl,
      data: { id: userId },
      automaticallyAddUrlPrefix: false
    }).then(res => {
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
