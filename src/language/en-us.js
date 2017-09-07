/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/7/30 by Heaven
 */

const languageObj = {
  QuietWater: {
    headerTitle: {
      countTextPostfix: 'responses'
    },
    loadMoreReplyText: 'more'
  },
  User: {

  },
  Reply: {
    settings: {
      settingsText: 'settings',
      // allowAllUsersComment: 'allow all users comment'
      closeComment: 'close comment',
      deleteText: 'delete'
    },
    shareText: 'share',
    commentBtnPostfix: 'comments',
    expandText: 'read more',
    foldText: 'fold',
    lastUpdatedTimeText: 'last update at',
    foldCommentText: 'fold comment'
  },
  Comment: {
    headerTitle: {
      isAuthorText: 'author',
      countTextPostfix: 'comments',
      replyToText: 'response to'
    },
    operationBar: {
      replyText: 'response',
      conversationText: 'view the conversations'
    },
    ConversationBox: {
      titleText: 'view the conversations'
    }
  },
  Editor: {
    replyEditor: {
      placeholderText: 'write response...',
      submitText: 'submit'
    },
    commentEditor: {
      cancelText: 'cancel',
      submitText: 'comment',
      placeholderText: 'write your comment...'
    }
  },
  OperationError: {
    backendInterfaceIncludesError: 'operate failure,please contact the admin',
    whenNotLogin: 'you cant operate before login',
    whenAddReplyError: 'create response failure,please check the network,if still,please contact the admin',
    whenAddCommentError: 'create network failure,please check the network,if still,please contact the admin'
  },
  languageName: 'en-us'
};

export default languageObj;
