**NOTE**: Now this repo has not finished,this is just for backup

# <a href='http://redux.js.org'><img src='' height='50'></a>

React-QuietWater is a comment system based on react, css-modules and redux, redux-orm, react-css-themr.It's UI inspired by
[zhihu](https://www.zhihu.com) and [medium](https://medium.com/)

### Motivation

Not only personal blog,websites,But also any websites around the world.Developers often want to add a comment module/area
in their apps to make it lively and active.So that's why React-QuietWater is here.

### Name origin
 
Today,a lot of people,of course including me,are **fickle and painful**.We treate others rigorously due to the blame
of our superior,the stress in our life,the atmosphere around our walk,dining and living.

So,on the network,we wantonly wreak our bad emotion to everyone,even our kinsfolk.

That's really,really too heartrending.That's **not** me,**not** us.

So,QuietWater means that talk with others like water which is peaceful,harmonious and loving.

### Installation

### Documentation

- *NOTE*: We would like to see any pr/(UI design)/(feature request)/enhancement based on our Name origin,but if they breaches our
Motivation,we won't accpt them,so we recommend you fork or just copy our repo and modify it to whatever you want.

### Config

1. Before you use this lib,you **must** need to do some configs to make it to correspond your requiredment and backend api.
If you don't do this,you probably get errors.Let's follow below steps(in any order):

All you need to do is call the method which import from the globalConfig module and then config QuietWater whatever you want.
e.g `import { configQuietWater } from 'react-QuietWater/lib/globalConfig configQuietWater({...})'`

The ... are the config paramas below:
```
  {
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
  
      quietWaterInitUrl: , // 初始化QuietWater时需要获取某些数据存储到localstorage里面
      hostUserLoginUrl: , // 很多操作都需要用户登录后才能操作,这个url是接入QuietWater的网站的用户的登录界面的url
      userInfoUrl: 'user/userInfo', // 获取网站本身的某个用户的信息
      quietWaterOfHostUrl: 'articles/info', // 获取QuietWater添加到的那个item的基本信息（如某篇文章,某个歌曲等.包括id,reply列表信息等等）
  
      post: {
        operationBar: {
          praiseUrl: 'reply/praise'
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
  }
```

2. **NOTE**: You must ensure the localstorage of your website have the above info2Storage's all properties when the user has login on your website.
For example:
```
    {
      data: {
        userInfo: { // this property name must be userInfo
          userName: 'userNameOfTheHost',
          loginName: 'loginNameOfTheHost',
          avatarUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3597382613,1842885761&fm=117&gp=0.jpg',
          userId: '45682021321',
          roleName: 'normal',
          userToken: 'Gwsdfdsfsdioiew.asdsadwipouiu34ndf.opuiouio72gfdio8k'
        }
      }
    }
```

and then you can import the QuietWater component

### Examples

### License

MIT
