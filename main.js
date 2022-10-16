/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-12 21:51:54
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-16 20:28:02
 * @FilePath: /crawl/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let read = require('./read');
let write = require('./write');
let tagsUrl = 'https://juejin.im/subscribe/all';//所有的标签的列表
(async function () {
  let tags = await read.tags(tagsUrl);
  tags = await write.tags(tags);
  let articles = {};
  for (let tag of tags) {
    //先获取 每个标签下面的文章的列表
    articles = await read.articles(tag.url, tag.name);
    await write.articles(articles, tag.id);
  }
})();