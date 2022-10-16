/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-13 21:09:54
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-16 20:26:00
 * @FilePath: /crawl/wirte/tags.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const query = require('../db');
const debug = require('debug')('crawl:write:tags');
let tags = async function(tags){
  debug('开始保存标签列表');
  for(let tag of tags){
      let oldTags = await query(`SELECT * FROM tags WHERE name = ? LIMIT 1`,[tag.name]);
      //如果数据库里已经有记录了，则需要按老的记录ID来列新数据
      if(Array.isArray(oldTags) && oldTags.length >0 ){
        await query(`UPDATE tags SET name=?,image=?,url=?,subscribe=?,article=? WHERE id=?`,[tag.name,tag.image,tag.url,tag.subscribe,tag.article,oldTags[0].id]);
      }else{
        await query(`INSERT INTO tags(name,image,url,subscribe,article) VALUES(?,?,?,?,?)`,[tag.name,tag.image,tag.url,tag.subscribe,tag.article]);  
      }
      debug(`成功保存标签:${tag.name}`);
  }
  return await query(`select * from tags`);
}
module.exports = {
    tags
}