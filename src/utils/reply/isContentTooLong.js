/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/5/10 by Heaven
 */

export default (content, wrapWidthNumber, contentSyle, languageName) => {
  if (typeof content !== 'undefined' && typeof wrapWidthNumber !== 'undefined') {
    const brTagCount = content.match(/<br>/g).length / 2; // at least two tags will cause blank line
    const brTagheight = 44;
    const wrodsCount = content.length;

    // TODO 每行的字数由很多因素决定,font-family,font-size,letter-spacing,甚至是图片,hr标签等等,暂时没有考虑那么多
    // the count of words per line is diffcult to decide due to font-family,font-size,
    // letter-spacing even image,hr tag etc.so now we just judge simply
    // assuming one word occupy averagely 13px for Chinese and 6px for English
    // TODO 一行的行高也由很多因素决定,br标签个数,line-height,甚至是img标签
    // the height of per line is also diffcult to decide
    let perWordWidth;
    let perLineHeight;
    const { fontSize, lineHeight } = contentSyle;
    switch (languageName.toLowerCase()) {
      case 'zh-cn':
        perWordWidth = +fontSize.substring(0, fontSize.indexOf('p'));
        perLineHeight = perWordWidth * lineHeight;
        break;
      case 'en-us':
        // TODO for English words,because most of them are not monospaced font,so we can't calculate easliy,
        // TODO hope there is someone could help us
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
