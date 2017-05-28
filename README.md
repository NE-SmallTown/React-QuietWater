**NOTE**: Now this repo has not finished,this is just for backup

# <a href='http://redux.js.org'><img src='' height='50'></a>

React-QuietWater is a comment system based on react, css-modules and redux, redux-orm, react-css-themr.It's UI inspired by
[zhihu](https://www.zhihu.com) and [medium](https://medium.com/),and think about something from twitter,facebook,quora and others
design website.

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

React-QuiertWater is based on React 16,though now it's in alpha,but this summer(2017) it will be released.Although now we
don't use much features in this repo(e.g. `<ErrorBoundary>`),but for future,we need to be familiar with next version of React,
so that's why I use it now.If you don't want to use React 16 in your project,sorry for that this repo can't work.

### Demo

You can view the [online example](https://www.NE-SmallTown.github.io/React-QuietWater).And please note that 
although we create mock data but the data maybe don't have correct logic like the real world.This demo is just
for showing the UI and the basic logic.

> NOTE: Some functions like praise/thumbdown a reply,submit reply/comment are allowable only when you have logined.
So for testing React-QuietWater expediently.Default our test api interface return a invalid token of the userInfo.So 
We provide a [token](https://github.com/NE-SmallTown/React-QuietWater/tree/master/examples/token),you can set it to your `config.localStorage.info2Storage.userToken` (default the value is 'u_tk',
i.e set `localstorage.u_tk` to the token value).And then you can test these functions otherwise it will redirect to the 
login page which you set.

### Documentation

- *NOTE*: We would like to see any pr/(UI design)/(feature request)/enhancement based on our Name origin,but if they breaches our
Motivation,we won't accpt them,so we recommend you fork or just copy our repo and modify it to whatever you want.

### Config

**NOTE**: Before you use this lib,you **must** need to do some configs to make it to correspond your requiredment and backend api.
If you don't do this,you probably get errors.Let's follow below steps:

1.Make sure you have set the `localStorage[config.localStorage.info2Storage.userId]` value at first,because we will request
userInfo by `config.api.quietWaterInitUrl` interface and then set the info to localstorage.

2.Make sure you have set the token of the user if the user has logined.Because many functions only can be used after the user
has logined(e.g. submit a reply),we will validate when you click these button.That's why we need a token.

NOTE: The token format need to fit in [jwt](https://jwt.io/) format and we use [jwt-decode](https://github.com/auth0/jwt-decode) to decode the token.

3.Set the [onUpdate function](/handleHashChange.js) to the Router Component because every reply correspond an anchor,so we need to  monitor the url change.

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

### Backend data interface format

**host**
```
    
```

**reply**
```

```

**comment**
```

```

Of course you can open the network panel of the browser to observe the data format in the demo to quickly know.

### Examples

### F & Q

#### 1.Why there is no any test?

A: Yea,I am really sorry about this,that's because at first I don't consider make this to a open src lib,I
plan add tests in the end.But after I write almost a week,I think it will be helpful if I put this to github.
On the other hand,I am not familiar with writing tests,so if there is any people who want to help,I will much
appreciated.

#### 2.Is there any third-party libs in this project?

Yes,IIRC,we use [react-spark-scroll](https://github.com/gilbox/react-spark-scroll) for scroll beacause I look through some libs and find that this is most
appropriate though it still has some problems.So you if have any better ideas,feel free to send a pr!And on other
hand,we use [classnames](https://github.com/JedWatson/classnames),[reselect](https://github.com/reactjs/reselect),[lodash](https://github.com/lodash/lodash),you can find all of them in the package.json file,these are ordinary libs
like others project.

#### 3.What does the `config.events.quietWater.prevReplyPressKey` means?

It means that you can press the `prevReplyPressKey` corresponding key of the keyboard to jump to previous reply
or next reply(by using `config.events.quietWater.nextReplyPressKey`).

### 4.Why the file create time from 2017/1 to now?

Yea,many files are from my previous project and are applicable for many projects,so I just copy them to this
repo,I don't modify the create time because it's unnecessary.So this is why the file create time in this repo have 
a little span.

### ISSUES

If you are Chinese,please believe that we have looked through 
- [如何评价知乎主站 2016 年末的设计改版？](https://www.zhihu.com/question/54303734)
- [如何评价知乎2017年1月的改版？](https://www.zhihu.com/question/54527018)
- [如何评价 2017 年 2 月 7 日知乎的新版网页界面？](https://www.zhihu.com/question/55523985)

Thanks for everyone who gives good advice in the comments of above question.They inspire me a lot,thanks!

We would like to listen and appreciate all issues/suggestions about whatever aspects.But please don't just complain
,that's very rude and meaningless.Please don't just think about yourself's thoughts or experience and think them are
the best design or blue print.If you have any good thought,feel free to file an issue or a pr!If you are friendly,we
would like to join the discussion,if not,we also accept but you have to prove your thoughts are acceptable by most people
and provide feasible scheme.So,if you are not friendly and can't prove and provide.We will don't reply the issue and close
it.

### License

MIT
