**NOTE**: Before you use this lib,you **must** need to do some configs to make it to correspond your requiredment and backend api.
If you don't do this,you probably get errors.Let's follow below steps:

1.Make sure you have set the `localStorage[config.localStorage.info2Storage.userId]` value and you should request
userInfo by `config.api.quietWaterInitUrl` interface and then set the info to localstorage.See `configUserInfo` function in the demo.

2.Make sure you have set the token of the user if the user has logined.Because many functions only can be used after the user
has logined(e.g. submit a reply),we will validate when you click these button.That's why we need a token.

NOTE: The token format need to fit in [jwt](https://jwt.io/) format and we use [jwt-decode](https://github.com/auth0/jwt-decode) to decode the token.

3.Set the [onUpdate function](https://github.com/NE-SmallTown/React-QuietWater/blob/master/src/utils/route/handleHashChange.js) to the Router Component because every reply correspond an anchor,so we need to  monitor the url change.

All you need to do is call the method which import from the globalConfig module and then config QuietWater whatever you want.
e.g `import { configQuietWater } from 'react-QuietWater/lib/globalConfig configQuietWater({...})'`

The `...` are the config paramas below:

*NOTE*: You also can see the demo's config to understand.

```
{
  // Note that this property value must match the file name in the /src/language directory
  // for now we just support 'zh-ch' language,but later we will support 'en-us' or others by contributors
  languageName: 'zh-cn'
  
  // the styles of React-QuietWater,notice that the key and value should mattch JSX's style object
  styles: {
    quietWater: {
    
    },
    replyEditor: {
    
    },
    loadMoreReplyBtn: {
      backgroundColor: 'rgb(247, 255, 248)'
    },
    replyList: {
      backgroundColor: 'rgba(255, 255, 255, 0.89)'
    },
    reply: {
      lineHeight: 1.9,
      fontSize: '15px',
      color: '#333333'
    },
    comment: {
      fontSize: '15px',
      color: '#333333'
    },
    conversationBox: {
      top: '30px',
      fontSize: '15px'
    },
    commentListBox: {
      fontSize: '15px'
    }
  }
  
  // the loading component when fetch something
  loading: {
    // when fetch commentList
    commentList: {
      getComponent: () => <img src="http://ogitl0zvo.bkt.clouddn.com/6756745434543879.gif" />
    }
  }
  
  events: {
    quietWater: {
      // we will check the document.activeElement's nodeName and attribute,if it matches one of the below
      // array's value,we will don't react the key event below.
      responsePrevOrNextReplyExcludeIn: ['input', 'textarea', 'contenteditable']
      
      // press this key will go to the previous reply
      prevReplyPressKey: 'j'
      
      // press this key will go to the next reply
      nextReplyPressKey: 'k'
    }
  }
  
  paginations: {
    replyList: {
      // what number of items will be loaded when you click the loadMore button
      pageSize: 6
    },
    commentList: {
      // what number of items will be loaded when you click the loadMore button or page of the pagination
      pageSize: 10
    }
  },

  router: {
    user: {
      // some sites' user router postfix is id（.../user/12345） whild otheres is loginName（.../user/userLoginName）
      postfixIsIdOrLoginName: 'id', // default is loginName
      
      // combine with above postfixIsIdOrLoginName to generate the user's url,when you click the userName or avatar,we will redirect to the url
      PREFIXURL: 'http://www.mysite.com/user/'
    }
  }, 
  api: {
    // public network request prefix
    PREFIX: 'https://www.easy-mock.com/mock/590c4f0087cce4690fed1f43/qw/api/'
    
    // some action need to have permission,such as submit a comment,praise a reply
    // private network request prefix,we will the Authorization header by this request type
    P_PREFIX: 'https://www.easy-mock.com/mock/590c4f0087cce4690fed1f43/qw/api/p/'

    // when before init React-QuietWater we need put some info(i.e. userInfo) to the localstorage
    quietWaterInitUrl: 'https://www.easy-mock.com/mock/5919acf69aba4141cf23044d/common/rqw'
    
    // when user don't login,we will redirect to this url when they do some actions which need logined
    hostUserLoginUrl: 'https://github.com/login'
    
    // get the host item info(e.g article info,song info),the real url is `PREFIX + quietWaterOfHostUrl`
    quietWaterOfHostUrl: 'articles/info'
    
    // return the reply info when request reply(s)
    replyUrl: 'replies/info'
    
    // return the reply info when request comment(s)
    commentUrl: 'comments/info'
    
    // return the reply info when request conversation(s)
    conversationUrl: 'conversations/info'

    post: {
      operationBar: {
        praiseUrl: 'reply/praise' // the post url of praising a reply  
      }
      replyEditor: {
        createUrl: 'reply/add' // the post url of creating a reply  
      }
      commentEditor: {
        createUrl: 'comment/add' // the post url of creating a comment
      }
    }

    share: { // share a reply by social platform,e.g twitter,weibo,facebook
      weibo: { // share a reply by weibo
        sourceWebSiteName: '这是我网站的名称'
        sourceWebSiteUrl: 'https://www.mysite.com'

        getComponent ({ replyUrl, sharedText }) { // the arguments are injected by React-QuietWater
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
    }
    
    // the handler of response which includes a 'status' property
    responseStatusHandler: {
      'ok': () => {
        if (__DEV__) {
          console.log(`backend's response's 'status' value is 'ok'`);
        }

        Message.success('操作成功');
        // Message.success('operation success!');
      }
    }
    
    // the handler of response's http status
    httpStatusExcptionHandler: {
      401: () => {
        Message.error(`你的权限无法支持你现在的操作，如果你确认自己有权限的话，请联系管理员～`);
        // Message.success('your permission is inadequate,if you ensure you have the permission,you can contact with the admin!');
      }
    }
    
    // the handler of response which includes a 'error' property 
    responseErrorHandler: {
      10036: () => { // 10036 represent the `error.code`
        Message.error(`获取数据时出错`, 5);
        // Message.success('encounter error when get data!');
      }
    }
  }
  
  localStorage: {
    // map response's user info's key to localstorage's key
    info2Storage: {
      userName: 'u_userName',
      loginName: 'u_loginName',
      avatarUrl: 'u_avatarUrl',
      userId: 'u_id',
      roleName: 'u_roleName',
      userToken: 'u_tk'
    }
  }
  
  sessionStorage: {
    // the hash appended in the url.e.g. http://www.mysite.com/song/432423#qw_curReply=5489896
    keyOfCurrentReplyItemHash: 'qw_curReply'
  }
}
```

2. **NOTE**: You must ensure the localstorage of your website have the above info2Storage's all properties when the user has logined on your website.
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

after that you can import the QuietWater component

### Backend data interface format

*NOTE*:You can open the network panel of the browser to observe the data format in the demo to quickly understand.

**User**

- Entity structure

```
{
  userId (string): the if of the user
  userName (string): the name(disply in the screen) of the user
  loginName (string): the account which the user use when login
  avatarUrl (string): the avatar url of the user
  roleName (string): the role of the user(our permission validation base on rule.e.g. 'normal', 'vip', 'badGuy' etc.
            but now we don't need this because it's in the todo list,if we have done this,we will update the readme)
}
```

**Host**

*NOTE*: Host represent the environment which use React-QuietWater.e.g. for a music site,the host is a song or a playlist.
For a blog,the host is a article.

- Entity structure

```
  {
    id (string): the id of the host(e.g. articleId or musicId)
    replies (array): below reply structure array of the host.
  }
```

**Reply**

- Entity structure

```
  {
    id (string): the id of the reply
    hostId (string): the host id which the comment belongs to
    commentCount (number): the amount of the reply's comments. e.g. 23
    praiseCount (number): the amount of the reply's praise.e.g 8
    excerpt (string): the excerpt of the content(displayed when we fold a reply).e.g. "西求老空以示两细基转局局什。教......"
    content (string): the content of the reply.e.g."西求老空以示两细基转局局什。教调入原果团放去积过才写类其广。<br><br>这列标集两联即明改个车保又书。四能民音事三五明再西划地在。<br><br>例生到心清要易白其便严越油确。江产说作气也为起作严领我保便想值类。已同必特他形命斯志制压规许亲效该代。目名类光现示经想统转料术规。群最存些层技下历往查始斗备接。活连必五几引和每命这三变易究拉每力手。据保高看且要性任习思带拉志先权。法回很风每六业族至相此区处级来次品。却两手不容按规党林自装军眼学。并斗制况白位不任提同引风整织清求对。引战调被论心格照了等整构日入群深。当心结半会体习石林识做图周规。电备技厂南越算工素高员先。半教教现北立矿非省总史西青调革传民。府红使该结理国斯问与面名步意发权算切。<br><br>",
    createdTime (string): the create time when the user create the reply.e.g "1999-06-17 22:45:03"
    lastUpdatedTime (string): the latest time when the user update the reply.e.g "2012-12-26 23:59:07"
    author (object): the user structure above
  }
```

- Create reply
```
  // request: 
  {
    hostId (string): the corresponding id of the host of your situation(e.g. articleId or musicId)
    content (string): the original html string of the editor content
  }
  
  // response:
  {
    data: {
      status (string): 'ok' | 'error'
      reply (object): the reply structure above
    }
  }
```

- Modify reply(todo)

*NOTE*: Host id should be different with reply id.

**Comment**

- Entity structure

```
  {
    id (string): the id of the comment
    replyId (string): the reply id which the comment belongs to
    isAuthor (boolean): represent whether the user of the comment is the user who the user want to reply
    author {object}: the user structure above
    content (string): the comment content
    createdTime (string): the create time when the user create the reply
    replyTo {object}: the user structure above,represent who the user want to reply
  }
```

- Create comment
```
  // request: 
  {
    replyId (string): the corresponding id of the reply which you want reply
    content (string): the original html string of the editor content
  }
  
  // response:
  {
    data: {
      status (string): 'ok' | 'error'
      comment (object): the comment structure above
    }
  }
```

- Delete comment(todo)

- Modify comment(todo)