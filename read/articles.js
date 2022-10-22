/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-13 21:05:25
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-22 20:51:59
 * @FilePath: /crawl/read/articles.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let debug = require('debug')('crawl:read:tags');
const  axios = require('axios');
let cheerio = require('cheerio');
let articles = async function (url, tagName) {
  debug(`开始读取${tagName}标签下面的文章列表`);
  
  let options = {
    url: decodeURIComponent(url) + '?sort=hottest',
  }
  let { data } = await axios(options);
  let $ = cheerio.load(data);
  let articles = [];
  let items = $('.entry-list .item .content-wrapper');
  for(let i=0;i<items.length;i++){
    let item = items[i];  
    let $this = $(item);
    let title = $this.find('.title').text().trim();
    let href = $this.find('.title').attr('href');//取出超链接 /post/5c2f2fd66fb9a049ff4e43f0
    let like = $this.find('.like span').text().trim(); // 点赞量
    if(!href.startsWith('/entry')){
      let id = href.match(/\/(\w+)$/)[1];
       articles.push({
          id,
          title,
          href,
          likes: like
       });
       debug(`读取到文章: ${title}`);
    }
  }
  return articles;
}

exports.articles = articles;