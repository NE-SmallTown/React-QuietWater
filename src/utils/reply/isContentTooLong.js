/**
 * v0.0.1
 *
 * Copyright (c) 2016 Heaven
 *
 * Date: 2017/5/10 by Administrator
 */

export default (content, wrapWidthNumber, languageName) => {
  if (typeof content !== 'undefined' && typeof wrapWidthNumber !== 'undefined') {
    const brTagCount = content.match(/<br>/g).length / 2; // at least two tags will cause blank line
    const brTagheight = 44;
    const wrodsCount = content.length;

    // TODO 每行的字数由很多因素决定,font-family,font-size,letter-spacing等等,暂时没有考虑那么多
    // the count of words per line is diffcult to decide due to font-family,font-size,letter-spacing etc.
    // so now we just judge simply
    // assuming one word occupy averagely 13px for Chinese and 6px for English
    // TODO 一行的行高也由很因素决定,br标签个数,line-height,甚至是img标签
    // the height of per line is also diffcult to decide
    let perWordWidth;
    let perLineHeight;
    switch (languageName.toLowerCase()) {
      case 'zh-cn':
        perWordWidth = 13;
        perLineHeight = 28;
        break;
      case 'en-us':
        perWordWidth = 6;
        perLineHeight = 26;
        break;
    }

    const linesOfContent = wrodsCount / (wrapWidthNumber / perWordWidth);
    const totalHeight = linesOfContent * perLineHeight + brTagCount * brTagheight;

    // because we set the max-height of content to 400px
    console.log(totalHeight);
    return totalHeight > 400;
  } else {
    throw Error('you must provide the content and wrapWidthNumber arguments!');
  }
};
