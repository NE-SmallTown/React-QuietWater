import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './AppContainer';
import Message from 'react-quietwater/lib/components/Message';
import SvgIcon from 'react-quietwater/lib/components/SvgIcon';

import { formatUrl } from 'url-lib';

import {
  configQuietWater,
  globalConfig,
  getCurrentUserId,
  setCurrentUserId,
  info2Storage
} from 'react-quietwater';
import { network } from 'react-quietwater/lib/utils/network';

// NOTE: please import the global css(e.g. normalize.css, rc-pagination.css,rc-message.css) and React-QuietWater's
// css which it needs, if you don't import them,probably React-QuietWater can't work.And you should note that
// these 2 css can't be css mouduled,they should be imported as a global module rather than css moudle.So you
// can notice that in our demo's webpack config,we exclude the import which form node_modules in the
// **css/scss modules** loader to avoid treat below 2 css as css modules and include the import which from
// node_modules in the **css/scss loader**(note this is just a normal css loader, i.e. doesn't use css modules)
// to make we can resolve below 2 css as global css.
import 'react-quietwater/lib/cssDist/React-QuietWater-Global.scss';

// if you use babel-plugin-react-css-modules,we need to add the '../node_modules' prefix and set exclude
// option of the plugin to 'node_modules' to avoid the plugin to ignore our css file(i.e. not treat them
// as a css modules).And notice that if you just set the exclude option of the plugin to 'node_modules'
// but don't add the '../node_modules' prefix,we will get error "Cannot find module 'react-quietwater/lib/
// cssDist/React-QuietWater.scss" due to https://github.com/gajus/babel-plugin-react-css-modules/blob/master/src/index.js#L126
// import '../node_modules/react-quietwater/lib/cssDist/React-QuietWater.css';
import 'react-quietwater/lib/cssDist/React-QuietWater.scss';

import './example.css';

// config React-QuietWater
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
      },
      replyEditor: {
        createUrl: 'reply/add'
      },
      commentEditor: {
        createUrl: 'comment/add'
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

// config user info
export const configUserInfo = () => {
  // just for test,because in real environment we must has set userId to localstorage before we call React-QuietWater
  setCurrentUserId('xxxxxxxxxx');

  let userId = getCurrentUserId();

  // 测试的时候为了方便(即不需要一个登录页和登录相关的逻辑)我们在获取用户信息的时候返回了token,但是实际中肯定是不可能的,因为那样
  // 每个人都可以获取任意用户的token,token应该是只有登录接口才会提供
  // below just use fetch or 3rd-party lib about fetch is fine
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

// config our app
const render = () => {
  const routes = require('./routes/index').default;

  ReactDOM.render(
    <AppContainer routes={routes} />,
    MOUNT_NODE
  );
};

render();
