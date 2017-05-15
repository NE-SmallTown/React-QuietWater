/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/3 by Administrator
 */

import merge from 'lodash/merge';

import Message from '../components/Message';

const configParams = {
  responseNormalizeSchema: { // 进行范式化的各个api返回的数据的schema,会与QuietWater本身已经设置好的schema进行合并
    quietWaterOfHost: {} // 这里根据自己的业务进行设置,但是后端必须按照QuietWater本身已经设置好的schema的格式返回数据
  },
  router: {
    user: {
      postfixIsIdOrLoginName: 'id', // 有的网站用户路由的后者是用的id（.../user/123）,有的是用的用户名（.../user/qweksdfs）
      PREFIXURL: 'http://www.mysite.com/user/'
    }
  },
  api: {
    PREFIX: 'http://www.easy-mock.com/mock/590c4f0087cce4690fed1f43/qw/api/',
    P_PREFIX: 'http://www.easy-mock.com/mock/590c4f0087cce4690fed1f43/qw/api/p/', // p represent private

    quietWaterInitUrl: 'http://www.easy-mock.com/mock/5919acf69aba4141cf23044d/common/rqw', // 初始化QuietWater时需要获取某些数据存储到localstorage里面
    hostUserLoginUrl: 'https://github.com/login', // 很多操作都需要用户登录后才能操作,这个url是接入QuietWater的网站的用户的登录界面的url
    quietWaterOfHostUrl: 'articles/info', // 获取QuietWater添加到的那个item的基本信息（如某篇文章,某个歌曲等.包括id,reply列表信息等等）

    post: {
      operationBar: {
        praiseUrl: 'reply/praise'
      }
    },

    responseStatusHandler: {
      'ok': () => {
        if (__DEV__) {
          console.log(`backend's response's 'status' filed's value is 'ok'`);
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
  },
  localStorage: {
    info2Storage: {
      userName: 'u_userName',
      loginName: 'u_loginName',
      avatarUrl: 'u_avatarUrl',
      userId: 'u_id',
      roleName: 'u_roleName',
      userToken: 'u_tk'
    }
  }
};

export default configParams;

export const configQuietWater = options => {
  merge(configParams, options);
};
