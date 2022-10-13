/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-13 21:09:58
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-13 22:58:23
 * @FilePath: /crawl/write/articles.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const query = require('../db');
const debug = require('debug')('crawl:write:articles');
// const elasticsearch = require('../elasticsearch');
// const sendMail = require('../mail');
//保存文章的详情和文章和标签的关系
let articles = async function(articleList){
  debug(`写入文章列表`);
  for(let article of articleList){ //循环文章数组的每一个元素
    let oldArticles = await query(`SELECT * FROM articles WHERE id=? LIMIT 1`,[article.id]);
    if(Array.isArray(oldArticles) && oldArticles.length >0){
       await query(`UPDATE articles SET title=?,href=? WHERE id=?`,[article.title,article.href,article.id]);
    }else{
        //如果走到 这个分支，就意味着读取了新的文章。则认为文章就更新了
       await  query(`INSERT INTO articles(id,title,href) VALUES(?,?,?)`,[article.id,article.title,article.href]);
    }
  }
}

module.exports = {
    articles
}