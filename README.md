**NOTE**: Now this repo has not finished,this is just for backup

# <a href='http://redux.js.org'><img src='' height='50'></a>

React-QuietWater is a comment system based on react, css-modules and redux, redux-orm, react-css-themr.

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

Before you use this lib,you **must** need to do some configs to make it to correspond your requiredment and backend api.
If you don't do this,you probably get errors.Let's follow below steps(in any order):

All you need to do is call the method which import from the globalConfig module and then config QuietWater whatever you want.
e.g `import { configQuietWater } from 'react-QuietWater/lib/globalConfig configQuietWater({...})'`

The ... are the config paramas below:
```
  {
    api: {
      PREFIX: 'http://localhost:8080/QuietWater/api/', //
      P_PREFIX: 'http://localhost:8080/QuietWater/api/p/', //
      userInfoUrl: 'user/userInfo', //
      responseStatusHandler: { //
        'ok': () => { //
          console.log(`backend's response's 'status' filed's value is 'ok'`);
  
          Message.success('操作成功');
        }
      },
      httpStatusHandler: { //
        401: () => { //
          Message.error(`你的权限无法支持你现在的操作，如果你确认自己有权限的话，请联系管理员～`);
        }
      },
      responseErrorHandler: { //
        1504: () => { //
          Message.error(`请不要修改localstorage里的字段，更不要拿本网站做实验，拜托了`, 5);
        },
        1505: () => { //
          Message.error(`获取数据时出错，因为你的权限无法支持你现在的操作，如果你确认自己有权限的话，请联系管理员～`, 5);
        }
      }
    },
    localStorage: { //
      info2Storage: { //
        'userName': 'u_userName', //
        'loginName': 'u_loginName', //
        'avatarUrl': 'u_avatarUrl', //
        'userId': 'u_id', //
        'roleName': 'u_roleName' //
      }
    }
  }
```


### Examples

### License

MIT
