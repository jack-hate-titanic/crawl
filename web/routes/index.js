/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-16 21:45:29
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-17 21:45:04
 * @FilePath: /crawl/web/routes/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const router = require('koa-router')()
const query = require('../../db');

router.get('/', async (ctx, next) => {
  let tagId = ctx.request.query.tagId || 1;
  let tags = await query(`select * from tags`);
  let articles = await query(`select * from articles where tag_id = ?`,[tagId]);
  await ctx.render('index', {
    tags,
    articles
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
