/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-12 21:53:36
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-13 21:33:13
 * @FilePath: /crawl/read/tags.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let debug = require('debug')('crawl:read:tags');
const puppeteer = require('puppeteer');
let cheerio = require('cheerio');
exports.tags = async function (url) {
  debug('开始读取所有的标签列表');
   //打开一个浏览器
   const browser = await puppeteer.launch();
   // 打开一个页面
   const page = await browser.newPage();
   await page.goto(url, {
       waitUntil: 'networkidle0'
   });
  const html = await page.content();
  let $ = cheerio.load(html);
  let tags = [];
  $('.tag-list .item').each(function (index, item) {
    let $this = $(this);
    let image = $this.find('img.thumb').first();//找到了图片所有的img
    let imageUrl = image.attr('src');
    let indexOfSep = imageUrl.indexOf('?');
    if (indexOfSep != -1) {
      imageUrl = imageUrl.slice(0, indexOfSep);
    }
    let title = $this.find('.title').first();
 
    let name = title.text().trim();
    console.log(name);
    let subscribe = $this.find('.subscribe').first();//312369 关注
    let article = $this.find('.article').first();//28951 文章
    tags.push({
      image: imageUrl,//标签的图片地址
      name,//标签名
      url: `https://juejin.im/tag/${encodeURIComponent(name)}`,
      subscribe: Number(subscribe.text().match(/(\d+)/)[1]),//订阅数
      article: Number(article.text().match(/(\d+)/)[1])//文章数
    });
    debug(`读取到一个新的标签:${name}`);
  });
  return tags.slice(0,1);
}