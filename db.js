/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2022-10-13 21:10:30
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2022-10-13 21:23:13
 * @FilePath: /crawl/db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let mysql = require('mysql');
let Promise = require('bluebird');
let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'crawl',
  user: 'root',
  password: '123456'
});
connection.connect();
module.exports = Promise.promisify(connection.query).bind(connection);
