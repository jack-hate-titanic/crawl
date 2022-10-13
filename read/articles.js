/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-13 21:05:25
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-13 22:47:00
 * @FilePath: /crawl/read/articles.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let debug = require('debug')('crawl:read:tags');
const  axios = require('axios');
let cheerio = require('cheerio');
let articles = async function (url, tagName) {
  debug(`开始读取${tagName}标签下面的文章列表`);
  let options = {
    url: url + '?sort=hottest',
  }
  let { data } = await axios(options);
  let $ = cheerio.load(data);
  let articles = [];
  let items = $('.item .title');
  for(let i=0;i<items.length;i++){
    let item = items[i];  
    let $this  = $(item);
    let href = $this.attr('href').trim();//取出超链接 /post/5c2f2fd66fb9a049ff4e43f0
    if(!href.startsWith('/entry')){
       let title = $this.text().trim();
       let id = href.match(/\/(\w+)$/)[1];
       articles.push({
          id,
          title,
          href,
       });
       debug(`读取到文章: ${title}`);
    }
  }
  return articles;
}

exports.articles = articles;