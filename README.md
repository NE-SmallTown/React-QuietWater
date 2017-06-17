<p align="center">
    <img width="140" height="140" src="https://preview.ibb.co/hMtfCa/quiet_water_logo.png">
</p>

[![build status](https://img.shields.io/travis/NE-SmallTown/React-QuietWater.svg)](https://travis-ci.org/NE-SmallTown/React-QuietWater)
[![npm package](https://img.shields.io/npm/v/react-quietwater.svg?style=flat-square)](https://www.npmjs.com/package/react-quietwater)
[![npm downloads](https://img.shields.io/npm/dm/react-quietwater.svg?style=flat-square)](https://www.npmjs.org/package/React-QuietWater)
[![npm license](https://img.shields.io/npm/l/react-quietwater.svg?style=flat-square)](https://www.npmjs.com/package/react-quietwater)

### What is React-QuietWater?

**React-QuietWater** is a comment system based on [react](https://github.com/facebook/react), [react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules) and [redux-orm](https://github.com/tommikaikkonen/redux-orm).Its UI draw on [zhihu](https://www.zhihu.com) and [medium](https://medium.com/),
and think about something from twitter,facebook,quora and other design websites.

If you are interested in its origin,you can view [this](https://github.com/NE-SmallTown/React-QuietWater/blob/master/Origin.md)

### Installation

`npm install react-quietwater --save`

React-QuiertWater is based on React 16,though now it's in alpha,but this summer(2017) it will be released.Although now we
don't use much features in this repo(e.g. `<ErrorBoundary>`),but for future,we need to be familiar with next version of React,
so that's why I use it now.If you don't want to use React 16 in your project,sorry for that this repo can't work.

### Demo

You can view the [online example](https://ne-smalltown.github.io/React-QuietWater/examples/dist).And please note that 
although we use mock data(by [easy-mock](https://www.easy-mock.com/)) for the example but maybe the data don't have correct logic like the real world.This demo is just
for showing the UI and the basic logic.But if you want to improve this,pr is always welcomed.

> NOTE: Some functions like praise/thumbdown a reply,submit reply/comment are allowable only when you have logined.
So for testing React-QuietWater expediently.Default our test api interface doesn't return a token of the user.So 
We provide a [token](https://github.com/NE-SmallTown/React-QuietWater/tree/master/examples/token),you can set it to your `config.localStorage.info2Storage.userToken` (default the value is 'u_tk',
i.e set `localstorage.u_tk` to the token value).And then you can test these functions otherwise it will redirect to the 
login page which you set.

> NOTE: For now we just support browserHistory.If you use hashHistory,some modules maybe can't work.

### Documentation

- *NOTE*: We would like to see any pr/(UI design)/(feature request)/enhancement based on our Name origin,but if they breaches our
Motivation,we won't accpt them,so we recommend you fork or just copy our repo and modify it to whatever you want.

All you need to do is complete the [config options](https://github.com/NE-SmallTown/React-QuietWater/tree/master/examples/README.md) according to your use case.

### F & Q

You can view [this](https://github.com/NE-SmallTown/React-QuietWater/tree/master/examples/F&Q.md) to know some F & Q.

### Design thinking

If you are Chinese,please believe that we have looked through 
- [如何评价知乎主站 2016 年末的设计改版？](https://www.zhihu.com/question/54303734)
- [如何评价知乎2017年1月的改版？](https://www.zhihu.com/question/54527018)
- [如何评价 2017 年 2 月 7 日知乎的新版网页界面？](https://www.zhihu.com/question/55523985)

Thanks for everyone who gives good advice in the comments of above question.They inspire me a lot,thanks!

We would like to listen and appreciate all issues/suggestions about whatever aspects.But please don't just complain
,that's very rude and meaningless.Please don't just think about yourself's thoughts or experience and think them are
the best design or blue print.

If you have any good thought,feel free to file an issue or a pr!If you are friendly,we
would like to join the discussion,if not,we also accept but you have to prove your thoughts are acceptable by most people
and provide feasible scheme.So,if you are not friendly and can't prove and provide.We will don't reply the issue and close
it.

### License

MIT
